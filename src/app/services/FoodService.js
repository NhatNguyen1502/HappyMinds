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
                console.log(foods);
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
                { new: true },
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
        } else {
            console.log('Login fail!!!');
            res.redirect('/food');
        }
    }

    searchFood(req, res) {
        const name = req.body.search;
        Food.find({ name: { $regex: name, $options: 'i' } })
            .then((foods) => {
                foods = multipleMongooesToOject(foods);
                res.render('food', { foods });
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ error: 'An error' });
            });
    }

    sort(req, res) {
        let isLogin = false;
        let email;
        if (req.isAuthenticated()) {
            isLogin = true;
            email = req.user.email;
        }
        const sortValue = req.params.slug == 'up' ? 1 : -1;
        Food.find({})
            .sort({ calo: sortValue })
            .then((foods) => {
                foods = multipleMongooesToOject(foods);
                res.render('food', { foods, isLogin, email });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}
export default new FoodService();
