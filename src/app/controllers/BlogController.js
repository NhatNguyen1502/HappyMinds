class BlogController {
	index(req, res){
        res.render('blog');
	}
    showDetail(req, res){
        res.render('blog-detail');
    }
}

export default new BlogController();
