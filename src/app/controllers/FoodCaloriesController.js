class FoodCaloriesController {
    show(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        res.render('food', { isLogin });
    }
}

export default new FoodCaloriesController();
