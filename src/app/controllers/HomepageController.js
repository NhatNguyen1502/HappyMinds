import homepageService from '../services/HomepageService.js';

class HomepageController {
    // [GET] /homepage
    index(req, res) {
        homepageService.index(req, res);
    }

    checkBMI(req, res) {
        homepageService.checkBMI(req, res);
    }
}

export default new HomepageController();
