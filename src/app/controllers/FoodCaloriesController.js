import FoodService from '../services/FoodService.js';

class FoodCaloriesController {
    show(req, res) {
        FoodService.index(req, res);
    }
    search(req, res) {
        FoodService.search(req, res);
    }
    addToMenu(req, res) {
        FoodService.addToMenu(req, res);
    }
    sort(req, res) {
        FoodService.sort(req, res);
    }

    showPanigation = FoodService.showPanigation;
}

export default new FoodCaloriesController();
