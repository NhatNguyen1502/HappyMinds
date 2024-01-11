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
        // Food.find({})
        //     .then((foods) => {
        //         foods = multipleMongooesToOject(foods);
        //         res.render('food', { foods, isLogin, email });
        //     })
        //     .catch((err) => {
        //         res.status(400).json({ err: 'ERROR!' });
        //     });

        const itemsPerPage = 5;

        Food.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            Food.find({})
                .limit(itemsPerPage)
                .then((foods) => {
                    foods = multipleMongooesToOject(foods);
                    res.render('food', { foods, isLogin, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
                });
        });
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
