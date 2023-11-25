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
                            const totalTime = videos.reduce((total, video) => {
                                return total + video.duration;
                            }, 0);
                            const totalcalo = videos.reduce((total, video) => {
                                return total + video.caloriesAmount;
                            }, 0);

                            console.log(totalTime, '-', totalcalo);
                            const targetCalories = 250;
                            const targetTime = 10;
                            const numSets = 4;

                            const arr = findClosestCaloriesSets(
                                videos,
                                targetCalories,
                            );

                            console.log(arr);
                            // console.log("\nCalories Sum of Sets:");
                            // printCaloriesSumOfSets(arr);
                            res.render('user', {
                                user,
                                bmi,
                                isLogin,
                                videos: videos.slice(0, 10),
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

function findClosestCaloriesSets(videos, targetCalories) {
    const n = videos.length;
    const dp = new Array(n + 1)
        .fill(null)
        .map(() => new Array(targetCalories + 1).fill(null));

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= targetCalories; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = { subset: [], caloriesSum: 0 };
            } else if (videos[i - 1].caloriesAmount <= j) {
                const includeVideo = {
                    subset: [
                        ...dp[i - 1][j - videos[i - 1].caloriesAmount].subset,
                        videos[i - 1],
                    ],
                    caloriesSum:
                        dp[i - 1][j - videos[i - 1].caloriesAmount]
                            .caloriesSum + videos[i - 1].caloriesAmount,
                };
                const excludeVideo = dp[i - 1][j];

                dp[i][j] =
                    includeVideo.caloriesSum > excludeVideo.caloriesSum
                        ? includeVideo
                        : excludeVideo;
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    // Lấy ra 10 mảng con gần bằng targetCalories nhất
    const closestSets = dp[n][targetCalories].subset.slice(
        0,
        Math.min(dp[n][targetCalories].subset.length, 10),
    );

    return closestSets;
}
function printCaloriesSumOfSets(sets) {
    let caloriesSum;
    for (let i = 0; i < sets.length; i++) {
        const subset = sets[i];
        if (sets[i] == []) {
            caloriesSum = 0;
        } else
            caloriesSum = subset.reduce(
                (sum, video) => sum + video.caloriesAmount,
                0,
            );
        console.log(`Subset ${i + 1}: Total Calories Amount - ${caloriesSum}`);
    }
}

function printSubsetInfo(subsets) {
    for (let i = 0; i < subsets.length; i++) {
        let subset = subsets[i];
        let subsetInfo = `Subset ${i + 1}:\n`;

        let totalCalories = 0;
        let totalTime = 0;

        for (let j = 0; j < subset.length; j++) {
            const exercise = subset[j];
            totalCalories += exercise.caloriesAmount;
            totalTime += exercise.duration;
            subsetInfo += `- ${exercise.title}: ${exercise.duration} minutes, ${exercise.caloriesAmount} calories\n`;
        }

        // Chuyển đổi thời gian từ giây sang phút
        const totalTimeInMinutes = totalTime / 60;

        subsetInfo += `Total Time: ${totalTime} minutes\n`;
        subsetInfo += `Total Calories: ${totalCalories} calories\n`;

        console.log(subsetInfo);
    }
}

export default new UserService();
