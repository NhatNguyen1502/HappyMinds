import homepageService from '../services/HomepageService.js';

class HomepageController {
    // [GET] /homepage
    index(req, res) {
        homepageService.index(req, res);
    }

    showVideos(req, res){
        homepageService.showVideos(req, res);
    }
    showAllVideos(req, res){
        homepageService.showAllVideos(req, res);
    }
}

export default new HomepageController();
