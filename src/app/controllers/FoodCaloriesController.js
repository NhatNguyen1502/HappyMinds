import FoodService from '../services/FoodService.js';

class FoodCaloriesController {
    show(req, res) {
        FoodService.index(req, res);
    }
    addToMenu(req, res) {
        FoodService.addToMenu(req, res);
    }
}

export default new FoodCaloriesController();
