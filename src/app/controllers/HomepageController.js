import homepageService from '../services/HomepageService.js';

class HomepageController {
    index(req, res) {
        homepageService.index(req, res);
    }

    checkBMI(req, res) {
        homepageService.checkBMI(req, res);
    }
}

export default new HomepageController();
