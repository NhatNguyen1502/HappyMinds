class BlogDetailController {
    show(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        res.render('blogdetail', { isLogin });
    }
}

export default new BlogDetailController();
