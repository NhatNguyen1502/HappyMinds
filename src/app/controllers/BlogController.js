import BlogService from '../services/BlogService.js';
class BlogController {
    index(req, res) {
        BlogService.index(req, res);
    }
    showPanigation(req, res) {
        BlogService.showPanigation(req, res);
    }
    showDetail(req, res) {
        BlogService.showDetail(req, res);
    }
}

export default new BlogController();
