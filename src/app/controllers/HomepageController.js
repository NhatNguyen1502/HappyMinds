class HomepageController {
    // [GET] /homepage
    index(req, res) {
        res.render('homepage');
    }
    showVideo(req, res) {
        res.render('video');
    }
    // [GET] /homepage/:slug
    show(req, res) {
        res.send('Helo ae');
    }
}

export default new HomepageController();
