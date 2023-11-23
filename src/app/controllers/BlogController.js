class BlogController {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        res.render('blog', { isLogin });
    }
    showDetail(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        res.render('blog-detail', { isLogin });
    }
}

export default new BlogController();
