import User from '../models/User.js';
import Video from '../models/Video.js';

class UserService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            console.log('Hello', req.user.name);
            isLogin = true;
            User.findOne({ email: req.user.email })
                .lean()
                .then((user) => {
                    let height = user.height / 100;
                    let weight = user.weight;
                    let bmi = (weight / (height * height)).toFixed(2);
                    let bmiType;
                    let bmr;
                    user.userCaloriesAmount =
                        user.userCaloriesAmount !== undefined
                            ? user.userCaloriesAmount
                            : 0;
                    if (user.pal == 'Sedentary') {
                        bmr = 1.2;
                    } else if (user.pal == 'Lightly Active') {
                        bmr = 1.375;
                    } else if (user.pal == 'Moderately Active') {
                        bmr = 1.55;
                    } else if (user.pal == 'Very Active') {
                        bmr = 1.725;
                    } else bmr = 1.9;
                    if (user.sex == 'Male')
                        user.requiredCaloriesAmount =
                            (10 * user.weight +
                                6.25 * user.height -
                                5 * user.age +
                                5) *
                            bmr;
                    else
                        user.requiredCaloriesAmount =
                            (10 * user.weight +
                                6.25 * user.height -
                                5 * user.age -
                                161) *
                            bmr;
                    if (bmi < 18.5) {
                        bmiType = 'Underweight';
                    } else if (bmi >= 18.5 && bmi < 25) {
                        bmiType = 'Healthy';
                    } else if (bmi >= 25 && bmi < 30) {
                        bmiType = 'Overweight';
                    } else {
                        bmiType = 'Obese';
                    }
                    Video.find({ BMItype: bmiType })
                        .lean()
                        .then((videos) => {
                            let arr = findBestSubarrays(videos, 250);
                            console.log(arr.length);
                            console.log(
                                arr[0],
                                calculateTotalDuration(arr[0]),
                                calculateTotalCaloriesAmount(arr[0]),
                            );
                            res.render('user', {
                                user,
                                bmi,
                                bmiType,
                                isLogin,
                                videos1: arr[1],
                                videos2: arr[2],
                                videos3: arr[3],
                            });
                        });
                });
        } else {
            console.log('Login fail!!!');
            res.render('user', { isLogin });
        }
    }

    getUser = async (payload) => {
        try {
            const user = await User.findOne({ email: payload });
            return user;
        } catch (error) {
            console.log(error);
        }
    };

    createUser = async (payload) => {
        try {
            const newUser = await User.create(payload);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    };

    updateUser(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        User.findOneAndUpdate({ email: req.user.email }, req.body, {
            new: true,
        }).then((user) => {
            let height = user.height / 100;
            let weight = user.weight;
            let BMI = (weight / (height * height)).toFixed(2);
            res.render('user', { user, BMI, isLogin });
        });
    }
}
function findBestSubarrays(videos, targetCalories) {
    let result = [];
    let seenSubarrays = new Set();
    let memo = new Map();

    function hashSubarray(subarray) {
        return subarray.map((video) => video._id.toString()).join(',');
    }

    function deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    function backtrack(
        startIndex,
        currentSubarray,
        currentSum,
        currentDifference,
        elementCount,
    ) {
        if (currentSubarray.length >= 4 && currentDifference < targetCalories) {
            const subarrayHash = hashSubarray(currentSubarray);
            if (!seenSubarrays.has(subarrayHash)) {
                seenSubarrays.add(subarrayHash);
                result.push(currentSubarray.map((video) => deepCopy(video)));
            }
        }

        if (elementCount >= 10 || startIndex >= videos.length) {
            return;
        }

        const memoKey = `${startIndex}_${currentSum}_${elementCount}`;
        if (memo.has(memoKey)) {
            return;
        }

        for (let i = startIndex; i < videos.length; i++) {
            currentSubarray.push(deepCopy(videos[i])); // Sử dụng deep copy để sao chép đầy đủ các thuộc tính của video
            const newSum = currentSum + videos[i].caloriesAmount;
            const newDifference = Math.abs(newSum - targetCalories);

            backtrack(
                i + 1,
                currentSubarray,
                newSum,
                newDifference,
                elementCount + 1,
            );

            currentSubarray.pop();
        }

        memo.set(memoKey, true);
    }

    backtrack(0, [], 0, Number.MAX_SAFE_INTEGER, 0);

    result = result
        .filter((item) => item.length > 4 && item.length <= 10)
        .slice(0, 10);

    return result;
}

function calculateTotalDuration(arr) {
    let totalDuration = 0;

    for (let i = 0; i < arr.length; i++) {
        totalDuration += arr[i].duration; // Giả sử trường duration có thể không tồn tại
    }

    return totalDuration;
}

function calculateTotalCaloriesAmount(arr) {
    let totalCaloriesAmount = 0;

    for (let i = 0; i < arr.length; i++) {
        totalCaloriesAmount += arr[i].caloriesAmount;
    }

    return totalCaloriesAmount;
}

export default new UserService();
