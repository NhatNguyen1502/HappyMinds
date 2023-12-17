import Food from '../models/Food.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class FoodService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        Food.find({})
            .then((foods) => {
                foods = multipleMongooesToOject(foods);
                res.render('food', { foods, isLogin });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    // searchFood(req, res) {
    //     const search = req.query?.search;

    //     const query = search ? { title: { $regex: new RegExp(search, 'i') } } : {};

    //     Food.find(query)
    //         .then((foods) => {
    //             const formattedFoods = multipleMongooseToOject(foods);
    //             res.render('food', {formattedFoods, isLogin });
    //         })
    //         .catch((err) => {
    //             res.status(400).json({ err: 'error!' });
    //         });
    // }
}
export default new FoodService();
