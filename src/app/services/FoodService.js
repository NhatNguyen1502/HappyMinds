import Food from '../models/Food.js';
import User from '../models/User.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class FoodService {
    index(req, res) {
        let isLogin = false;
        let email;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
        }
        Food.find({})
        .lean()
        .then((foods) => {
            User.findOne({ email: email }) 
                .lean()
                .then((user) => {
                    const choseFood = user.choseFoode;
                    const idFoodArray = choseFood.map(food => food.idFood);
                    const gramFoodAray = choseFood.map(food => food.grams); 
                    // console.log(choseFood);
                    const foodLikedArray = user.foodLike;
                    Food.find({_id: {$in: idFoodArray}})
                        .lean()
                        .then((userMenu) => {
                            userMenu = userMenu.map((item, index) => {
                                let food = { id: item._id, name: item.name, calo: item.calo, grams: gramFoodAray[index], totalGrams:  gramFoodAray[index]/100*item.calo }
                                return food;
                            });
                            // console.log(foodLikedArray)
                            let foodLikedArrayString = foodLikedArray.map(String);
                            foods = foods.map((food) => {
                                if(foodLikedArrayString.includes(String(food._id))){
                                    food.isDisable = "false";
                                    return food
                                }
                                else{
                                    food.isDisable = "true";
                                    return food
                                }
                            })
                            // console.log(userMenu)

                            res.render('food', { foods, isLogin, email, user, userMenu, foodLikedArray });
                        })
                        .catch((userMenuErr) => {
                            console.log("loi menu");
                            res.status(400).json({ err: 'ERROR!' });
                        })
                })
                .catch((userErr) => {
                    console.log("loi user");
                    res.render('food', { foods, isLogin, email});
                    
                });
        })
        .catch((foodErr) => {
            res.status(400).json({ err: 'ERROR!' });
            console.log("loi food");
        });
    
        // Food.find({})
        //     .then((foods) => {
        //         foods = multipleMongooesToOject(foods);
        //         res.render('food', { foods, isLogin, email });
        //     })
        //     .catch((err) => {
        //         res.status(400).json({ err: 'ERROR!' });
        //     });
        // =============================================================================================


        // Food.countDocuments().then((count) => {
        //     const totalPages = Math.ceil(count / itemsPerPage);

        //     Food.find({})
        //         .limit(itemsPerPage)
        //         .then((foods) => {
        //             foods = multipleMongooesToOject(foods);
        //             res.render('food', { foods, isLogin, totalPages });
        //         })
        //         .catch((err) => {
        //             res.status(500).json({ err: 'ERROR!' });
        //         });
        // });
    }

    showPanigation(req, res) {
        let currentPage = parseInt(req.query.page);
        const itemsPerPage = 5;

        Food.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            Food.find({})
                .lean()
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then((foods) => {
                    res.json({ foods, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
                });
        });
    }

    addToMenu(req, res) {
        const email = req.body.emailUser;
        const idFood = req.body.idFood;
        const gramFood = req.body.grams;
        console.log(email, idFood, gramFood);
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
            // console.log(email);
            User.findOneAndUpdate(
                { email: email },
                { $push: { choseFoode: { idFood: idFood, grams: gramFood } } },
                { new: true })
                .then((user) => {
                    console.log(user)
                    const choseFood = user.choseFoode;
                    const idFoodArray = choseFood.map(food => food.idFood);
                    const gramFoodAray = choseFood.map(food => food.grams);
                    Food.find({_id: {$in: idFoodArray}})
                        .lean()
                        .then((userMenu) => {
                            userMenu = userMenu.map((item, index) => {
                                let food = { id: item._id, name: item.name, calo: item.calo, grams: gramFoodAray[index], totalGrams:  gramFoodAray[index]/100*item.calo }
                                return food;
                            });
                            const foodLikedArray = user.foodLike;
                            const foodLikedArrayString = foodLikedArray.map(String);
                            // console.log('Món ăn đã được thêm vào mảng choseFoode.');
                            Food.find({})
                                .lean()
                                .then((foods) => {
                                    foods = foods.map((food) => {
                                        if(foodLikedArrayString.includes(String(food._id))){
                                            food.isDisable = "false";
                                            return food
                                        }
                                        else{
                                            food.isDisable = "true";
                                            return food
                                        }
                                    });
                                    res.json({ foods, userMenu, isLogin, email });
                                })
                                .catch((err) => {
                                    res.status(400).json({ err: 'ERROR!' });
                                });
                        })
                        .catch((error) => {
                            console.log('Đã xảy ra lỗi khi thêm món ăn:', error);
                        });
                    
                })
                .catch((error) => {
                    console.log('Đã xảy ra lỗi khi thêm món ăn:', error);
                });
        } else {
            console.log('Login fail!!!');
            res.redirect('/food');
        }
    }

    removeFromMenu(req, res) {
        let isLogin = false;
        let email;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
            const idFood = req.query.id;
            User.findOneAndUpdate(
                { email: email },
                { $pull: { choseFoode: { idFood: idFood} } },
                { new: true })
            .lean()
            .then((user) => {
                // console.log(user);
                const choseFood = user.choseFoode;
                const idFoodArray = choseFood.map(food => food.idFood);
                const gramFoodAray = choseFood.map(food => food.grams);
                Food.find({_id: {$in: idFoodArray}})
                .lean()
                .then((userMenu) => {
                    userMenu = userMenu.map((item, index) => {
                        let food = { id: item._id, name: item.name, calo: item.calo, grams: gramFoodAray[index], totalGrams:  gramFoodAray[index]/100*item.calo }
                        return food;
                    });
                    res.json({ userMenu});
                })
                .catch((err) => {
                    res.status(400).json({ err: 'ERROR!' });
                });
                        
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });

        }
        else {
            console.log('Login fail!!!');
            res.redirect('/food');
        }
    }

    search(req, res) {
        const name = req.query.keyword;
        let currentPage = parseInt(req.query.page);
        const itemsPerPage = 5;

        Food.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            Food.find({ name: { $regex: name, $options: 'i' } })
                .lean()
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then((foods) => {
                    res.json({ foods, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
                });
        });
    }

    sort(req, res) {
        let isLogin = false;
        let email;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
        }
        const sortValue = req.query.keyword == 'up' ? -1 : 1;
        Food.find({})
            .sort({ calo: sortValue })
            .lean()
            .then((foods) => {
                User.findOne({email: email})
                .lean()
                .then((user) => {
                    const foodLikedArray = user.foodLike;
                    // console.log(foodLikedArray);
                    let foodLikedArrayString = foodLikedArray.map(String);
                    foods = foods.map((food) => {
                        if(foodLikedArrayString.includes(String(food._id))){
                            food.isDisable = "false";
                            return food
                        }
                        else{
                            food.isDisable = "true";
                            return food
                        }
                    })
                    // res.render('food', { foods, isLogin, email });
                    res.json({ foods });
                }) 
                .catch((err) => {
                    console.log('Chưa đăng nhập');
                    res.status(400).json({ err: 'ERROR!' });
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    filterFavourite(req, res) {
        let isLogin = false;
        let email;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
        }
        Food.find({})
        .lean()
        .then((foods) => {
            User.findOne({email: email})
            .lean()
            .then((user) => {
                console.log(user);
                const foodLikedArray = user.foodLike;
                let foodLikedArrayString = foodLikedArray.map(String);
                // console.log(foodLikedArrayString)
                foods = foods.map( food => {
                    if(foodLikedArrayString.includes(String(food._id))){
                        food.isDisable = "false";
                        return food
                    }
                    else{
                        food.isDisable = "true";
                        return food
                    }
                })
                foods = foods.filter(food => food.isDisable === "false");
                // console.log(foods)

                res.json({ foods });
            })
            .catch((err) => {
                console.log("")
                res.status(400).json({ err: 'ERROR!' });
            });
        })
        .catch((err) => {
            res.status(400).json({ err: 'ERROR!' });
        });
    }

    filterCategory(req, res) {
        let isLogin = false;
        let email;
        let category = req.query.category;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
        }
        Food.find({})
        .lean()
        .then((foods) => {
            User.findOne({email: email})
            .lean()
            .then((user) => {
                // console.log(user);
                const foodLikedArray = user.foodLike;
                let foodLikedArrayString = foodLikedArray.map(String);
                // console.log(foodLikedArrayString)
                foods = foods.map( food => {
                    if(foodLikedArrayString.includes(String(food._id))){
                        food.isDisable = "false";
                        return food
                    }
                    else{
                        food.isDisable = "true";
                        return food
                    }
                })
                foods = foods.filter(food => food.category === category);
                // console.log(foods)

                res.json({ foods });
            })
            .catch((err) => {
                console.log("")
                res.status(400).json({ err: 'ERROR!' });
            });
        })
        .catch((err) => {
            res.status(400).json({ err: 'ERROR!' });
        });
    }

    addToFavourite(req, res) {
        let isLogin = false;
        let email;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
            const idFood = req.query.id;
            Food.findOne({ _id : idFood})
            .lean()
            .then((food) => {
                User.findOneAndUpdate(
                    { email: email },
                    { $push: { foodLike: food._id } },
                    { new: true })
                    .then((user) => {
                        // console.log(user)
                        res.json({ food, isLogin, email });
                    })
                    .catch((err) => {
                        res.status(400).json({ err: 'ERROR!' });
                    });
                        
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });

        }
        else {
            console.log('Login fail!!!');
            res.redirect('/food');
        }
    }

    removeFromFavourite(req, res) {
        let isLogin = false;
        let email;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
            const idFood = req.query.id;
            Food.findOne({ _id : idFood})
            .lean()
            .then((food) => {
                User.findOneAndUpdate(
                    { email: email },
                    { $pull: { foodLike: food._id } },
                    { new: true })
                    .then((user) => {
                        res.json({ food, isLogin, email });
                    })
                    .catch((err) => {
                        res.status(400).json({ err: 'ERROR!' });
                    });
                        
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });

        }
        else {
            console.log('Login fail!!!');
            res.redirect('/food');
        }
    }

    ultimateFilter(req, res) {
        let fvrStatus = req.query.fvr;
        let engStatus = req.query.eng;
        let ctgrKeyword = req.query.keyword;
        console.log(fvrStatus, engStatus, ctgrKeyword);
    
        let isLogin = false;
        let email;
    
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
            console.log(email);
        }
    
        User.findOne({ email: email })
            .lean()
            .then((user) => {
                console.log(user);
                const foodLikedArray = user.foodLike;
                console.log(foodLikedArray);
    
                Food.find({})
                    .lean()
                    .then((foods) => {
                        let foodLikedArrayString = foodLikedArray.map(String);
    
                        foods = foods.map((food) => {
                            if (foodLikedArrayString.includes(String(food._id))) {
                                food.isDisable = "false";
                                return food;
                            } else {
                                food.isDisable = "true";
                                return food;
                            }
                        });
                        if (fvrStatus == "false") {
                            foods = foods.filter((food) =>
                                foodLikedArrayString.includes(String(food._id))
                            );
                            console.log(foods);
                        }
                        if (engStatus == "false") {
                            foods = foods.sort((a, b) => a.calo - b.calo);
                            console.log(foods);
                        }
                        else {
                            foods = foods.sort((a, b) => b.calo - a.calo);
                        }
                        if (ctgrKeyword != "none") {
                            foods = foods.filter((food) => food.category === ctgrKeyword);
                            console.log(foods);
                        }
    
                        res.json({foods});
                    })
                    .catch((error) => {
                        console.error(error);
                        res.status(500).json({ error: "Internal server error" });
                    });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Internal server error" });
            });
    }
    
    
}
export default new FoodService();
