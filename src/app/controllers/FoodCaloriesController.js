class FoodCaloriesController {
    // [GET] /homepage/:slug
    show(req, res) {
        res.render('food');
    }
}

export default new FoodCaloriesController();
