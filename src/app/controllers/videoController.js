class videoController {
    // [GET] /video
    showVideo(req, res) {
        res.render('video');
    }
}

export default new videoController();
