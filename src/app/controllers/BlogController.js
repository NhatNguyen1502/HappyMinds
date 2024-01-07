import BlogService from '../services/BlogService.js';
class BlogController {
    index(req, res) {
        BlogService.index(req, res);
    }
    showDetail(req, res) {
        BlogService.showDetail(req, res);
    }
    createBlog(req, res){
        BlogService.createBlog(req, res);
    }
}

export default new BlogController();
