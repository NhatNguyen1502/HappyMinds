import VideoService from '../services/VideoService.js';

class VideoController {
    index(req, res) {
        VideoService.index(req, res);
    }
    show(req, res) {
        VideoService.show(req, res);
    }
}

export default new VideoController();
