import VideoService from '../services/VideoService.js';

class VideoController {
	show(req, res) {
		VideoService.index(req, res);
	}
	index(req, res){
        res.render('/');
	}
}

export default new VideoController();
