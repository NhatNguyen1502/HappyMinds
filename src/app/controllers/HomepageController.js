import homepageService from '../services/HomepageService.js';

class HomepageController {
    // [GET] /homepage
    index(req, res) {
        homepageService.index(req, res);
    }
    showVideo(req, res) {
        res.render('video');
    }
}

export default new HomepageController();
