import VideoService from '../services/VideoService.js';

class VideoController {
    show(req, res) {
        VideoService.index(req, res);
    }
}

export default new VideoController();