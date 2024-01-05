import BlogService from '../services/BlogService.js';
class CommentController {
    index(req, res) {
        BlogService.index(req, res);
    }
    showComment(req, res) {
        BlogService.showComment(req, res);
    }
}

export default new CommentController();
