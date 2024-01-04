import VideoService from '../services/VideoService.js';

class VideoController {
    index(req, res) {
        VideoService.index(req, res);
    }
    show(req, res) {
        VideoService.show(req, res);
    }
    viewcoach(req, res){
        res.render("viewCoach")
    }
}

export default new VideoController();
