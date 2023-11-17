class BlogDetailController {
    // [GET] /homepage/:slug
    show(req, res) {
        res.render('blogdetail');
    }
}

export default new BlogDetailController();