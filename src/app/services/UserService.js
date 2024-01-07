import User, {BMR, ActivityStatus, BMIStatus} from '../models/User.js';
import Video from '../models/Video.js';
import Food from '../models/Food.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class UserService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
            let email = req.user.email;
            User.findOne({ email: req.user.email })
                .lean()
                .then((user) => {
                    let foodsID = user.choseFoode;
                    let bmi = user.BMIchange[user.BMIchange.length - 1]?.value || 0;
                    let bmiType;
                    console.log(bmi + ' bmi');
                    if (bmi < 18.5) {
                        bmiType = BMIStatus.UNDERWEIGHT;
                    } else if (bmi >= 18.5 && bmi < 25) {
                        bmiType = BMIStatus.HEALTHY;
                    } else if (bmi >= 25 && bmi < 30) {
                        bmiType = BMIStatus.OVERWEIGHT;
                    } else {
                        bmiType = BMIStatus.OBESE;
                    }
                    Video.find({ BMItype: bmiType })
                        .lean()
                        .then((videos) => {
                            let arr = findBestSubarrays(videos, 250);
                            Food.find({ _id: { $in: foodsID } }).then(
                                (foods) => {
                                    foods = multipleMongooesToOject(foods);
                                    const totalCalories = foods.reduce(
                                        (total, food) => {
                                            return total + food.calo;
                                        },
                                        0,
                                    );
                                    res.render('user', {
                                        totalCalories: totalCalories.toFixed(2),
                                        foods,
                                        user,
                                        ActivityStatus,
                                        isLogin,
                                        videos1: arr[0]
                                    });
                                },
                            );
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

    getUserById(req, res) {
        let id = req.query.id;
        User.findOne({ _id: id })
            .lean()
            .then((user) => {
                res.json(user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getId(req, res) {
        let email = req.user.email;
        User.findOne({ email })
            .then((user) => {
                console.log(user);
                res.json(user);
            })
            .catch((err) => {
                console.log(err);
                res.send(err);
            });
    }

    createUser = async (payload) => {
        try {
            const newUser = await User.create(payload);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    };

    updateUser(req, res) {
        const { name, pal, sex, height, weight, age } = req.body;
    
        let requiredCaloriesAmount = 0;
        if (sex == 'Male') {
            requiredCaloriesAmount = (10 * weight + 6.25 * height - 5 * age + 5) * BMR[pal];
        } else {
            requiredCaloriesAmount = (10 * weight + 6.25 * height - 5 * age - 161) * BMR[pal];
        }
    
        const bmi = (weight / (height / 100) ** 2).toFixed(2);
    
        const currentDate = new Date();

        User.findOneAndUpdate(
            { 
                email: req.user.email,
            },
            {
                name: name,
                pal: pal,
                sex: sex,
                height: height,
                weight: weight,
                age: age,
                requiredCaloriesAmount: requiredCaloriesAmount,
                $set: {
                    BMIchange: [
                        { date: currentDate, value: parseFloat(bmi) }
                    ],
                },
            },
            {
                new: true,
            }
        )
        .then((updateUser) => res.json(updateUser))
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }); 
    }

    removeFood(req, res) {
        const idFood = req.params.idFood;
        const email = req.user.email;
        User.findOneAndUpdate(
            { email: email },
            { $pull: { choseFoode: idFood } },
            { new: true },
        )
            .then((user) => {
                res.redirect('/user');
            })
            .catch((error) => {
                console.log('loi roi');
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
