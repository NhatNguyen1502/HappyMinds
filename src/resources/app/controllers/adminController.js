class adminController {
    // [GET] /homepage
    index(req, res) {
        res.render('admin-user', { layout: 'admin.hbs', title: 'ADMIN-USER' });
    }
    // [GET] /homepage/:slug
    showFood(req, res) {
        res.render('admin-food', { layout: 'admin.hbs', title: 'ADMIN-FOOD' });
    }
    showVideo(req, res) {
        res.render('admin-video', { layout: 'admin.hbs', title: 'ADMIN-VIDEO' });
    }
    showBlog(req, res) {
        res.render('admin-blog', { layout: 'admin.hbs', title: 'ADMIN-BLOG' });
    }
}

export default new adminController();


class adminController {
    // [GET] /homepage
    index(req, res) {
        res.render('admin-user', { layout: 'admin.hbs', title: 'ADMIN-USER' });
    }
    // [GET] /homepage/:slug
    showFood(req, res) {
        res.render('admin-food', { layout: 'admin.hbs', title: 'ADMIN-FOOD' });
    }
    showVideo(req, res) {
        res.render('admin-video', { layout: 'admin.hbs', title: 'ADMIN-VIDEO' });
    }
    showBlog(req, res) {
        res.render('admin-blog', { layout: 'admin.hbs', title: 'ADMIN-BLOG' });
    }
}