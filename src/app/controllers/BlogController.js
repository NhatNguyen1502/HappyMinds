import BlogService from "../services/BlogService.js";
class BlogController {
	index = BlogService.index;
	
    showDetail(req, res){
        res.render('blogDetail');
    }   
}

export default new BlogController();
