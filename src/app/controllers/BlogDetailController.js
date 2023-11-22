import BlogService from '../services/BlogDetailService.js';

class BlogDetailController {
    async show(req, res) {
        try {
            await BlogService.show(req, res);
        } catch (error) {
            console.log('error');
        }
    }
}

export default new BlogDetailController();
