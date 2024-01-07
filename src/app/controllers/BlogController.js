import BlogService from '../services/BlogService.js';
class BlogController {
    showPanigation(req, res) {
        BlogService.showPanigation(req, res);
    }

    index = BlogService.index;

    showDetail = BlogService.showDetail;
}

export default new BlogController();
