import FoodService from '../services/FoodService.js';

class FoodCaloriesController {
    show(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        res.render('food', { isLogin });
        FoodService.index(req, res);
    }
}

export default new FoodCaloriesController();
