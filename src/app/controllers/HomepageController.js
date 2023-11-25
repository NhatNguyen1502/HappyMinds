import homepageService from '../services/HomepageService.js';

class HomepageController {
    // [GET] /homepage
    index(req, res) {
        homepageService.index(req, res);
    }

    showVideos(req, res){
        homepageService.showVideos(req, res);
    }
}

export default new HomepageController();
