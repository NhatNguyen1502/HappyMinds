import Food from '../models/Food.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class FoodService {
    index(req, res) {
        // const keyword = req.query.keyword;
        // Food.find({ name: { $regex: keyword, $options: 'i' } })
        //     .then((foods) => {
        //         foods = foods.map((food) => multipleMongooesToOject(food));
        //         foods = foods.filter((food) => food.name);
        //         res.render('foods', { foods });
        //     })
        //     .catch((err) => {
        //         res.status(400).json({ err: 'ERROR!' });
        //     });
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

// function findSearch() {
//     const foodService = new FoodService();
//     foodService.search();
// }

export default new FoodService();
