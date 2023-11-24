import BlogService from '../services/BlogService.js';
class BlogController {
    index(req, res) {
        BlogService.index(req, res);
    }
    showDetail(req, res) {
        BlogService.showDetail(req, res);
    }
}

export default new BlogController();
