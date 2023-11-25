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
                            let arr = findBestSubarrays(videos, 500);
                            for (let i = 0; i < 20; i++) {
                                const element = arr[i];
                                console.log(
                                    arr[i].length,
                                    calculateTotalDuration(arr[i]) / 60,
                                    calculateTotalCaloriesAmount(arr[i]),
                                );
                            }
                            res.render('user', {
                                user,
                                bmi,
                                bmiType,
                                isLogin,
                                videos1: arr[0],
                                time1: (
                                    calculateTotalDuration(arr[0]) / 60
                                ).toFixed(2),
                                calo1: calculateTotalCaloriesAmount(arr[0]),
                                videos2: arr[5],
                                time2: (
                                    calculateTotalDuration(arr[5]) / 60
                                ).toFixed(2),
                                calo2: calculateTotalCaloriesAmount(arr[5]),
                                videos3: arr[10],
                                time3: (
                                    calculateTotalDuration(arr[10]) / 60
                                ).toFixed(2),
                                calo3: calculateTotalCaloriesAmount(arr[10]),
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
            this.index(req, res);
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
        if (elementCount >= 4) {
            const subarrayHash = hashSubarray(currentSubarray);
            if (
                !seenSubarrays.has(subarrayHash) &&
                currentDifference < targetCalories
            ) {
                seenSubarrays.add(subarrayHash);
                result.push(currentSubarray.map((video) => deepCopy(video)));
            }
        }

        if (startIndex >= videos.length) {
            return;
        }

        const memoKey = `${startIndex}_${currentSum}_${elementCount}`;
        if (memo.has(memoKey)) {
            return;
        }

        for (let i = startIndex; i < videos.length; i++) {
            currentSubarray.push(deepCopy(videos[i]));
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

    result = result.sort((a, b) => {
        const sumA = a.reduce((sum, video) => sum + video.caloriesAmount, 0);
        const sumB = b.reduce((sum, video) => sum + video.caloriesAmount, 0);
        return (
            Math.abs(sumA - targetCalories) - Math.abs(sumB - targetCalories)
        );
    });

    return result;
}

function calculateTotalDuration(arr) {
    let totalDuration = 0;

    for (let i = 0; i < arr.length; i++) {
        totalDuration += arr[i].duration;
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
