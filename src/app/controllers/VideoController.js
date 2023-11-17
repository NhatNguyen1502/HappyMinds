import VideoService from '../services/VideoService.js';

class VideoController {
<<<<<<< HEAD
    show(req, res) {
        VideoService.index(req, res);
    }
    index(req, res){
        res.render('video');
    }
=======
	show(req, res) {
		VideoService.index(req, res);
	}
	index(req, res){
        res.render('/');
	}
>>>>>>> 6eed831cefda4edafc6d83cd3f9273bbd8cce5ca
}

export default new VideoController();
