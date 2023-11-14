class RecommendationController {
    // [GET] /homepage
    index(req, res) {
        res.render('recommendation');
    }
    // [GET] /homepage/:slug
    show(req, res) {
        res.send('Helo ae');
    }
}

export default new RecommendationController();
