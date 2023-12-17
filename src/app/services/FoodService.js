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
            .then((foods) => {
                foods = multipleMongooesToOject(foods);
                res.render('food', { foods, isLogin, email });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    addToMenu(req, res) {
        const email = req.body.emailUser;
        const idFood = req.body.idFood;

        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
            console.log(email);
            User.findOneAndUpdate(
                { email: email },
                { $push: { choseFoode: idFood } },
                { new: true }
            )
                .then(() => {
                    console.log('Món ăn đã được thêm vào mảng choseFoode.');
                    console.log(email);
                    Food.find({})
                        .then((foods) => {
                            foods = multipleMongooesToOject(foods);
                            res.render('food', { foods, isLogin, email });
                        })
                        .catch((err) => {
                            res.status(400).json({ err: 'ERROR!' });
                        });
                })
                .catch((error) => {
                    console.log('Đã xảy ra lỗi khi thêm món ăn:', error);
                });
        }
        else {
            console.log('Login fail!!!');
            res.redirect('/food');
        }
    }

    searchFood(req, res) {
        const search = req.body.search;

        // const query = search ? { title: { $regex: new RegExp(search, 'i') } } : {};

        Food.find(query)
            .then((foods) => {
                // const foods = multipleMongooseToOject(foods);
                try {
                    const foodNames = foods.map((food) => food.name);
                
                    // Tìm kiếm món ăn gần giống với tên món ăn trong mảng
                    Food.find({
                      name: { $in: foodNames },
                    })
                    .then(
                        
                    )
                
                    return similarFoods;
                  } catch (error) {
                    throw new Error('Error occurred while finding similar foods');
                  }
                res.render('food', {formattedFoods, isLogin }); 
            })
            .catch((err) => {
                res.status(400).json({ err: 'error!' });
            });
    }
}

export default new FoodService();
