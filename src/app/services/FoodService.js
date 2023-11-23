import Food from '../models/Food.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class FoodService {
    index(req, res) {
        Food.find({})
            .then((foods) => {
                foods = multipleMongooesToOject(foods);
                console.log(foods);
                res.render('food', { foods });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}

export default new FoodService();
