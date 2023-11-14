class HomepageController {
    // [GET] /homepage
    index(req, res) {
        res.render('homepage');
    }
    // [GET] /homepage/:slug
    show(req, res) {
        res.send('Helo ae');
    }
}

export default new HomepageController();
