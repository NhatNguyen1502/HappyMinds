import AdminService from '../services/AdminService.js';

class AdminController {
    index(req, res) {
        res.render('admin-user', { layout: 'admin.hbs', title: 'ADMIN-USER' });
    }
    showFood(req, res) {
        res.render('admin-food', { layout: 'admin.hbs', title: 'ADMIN-FOOD' });
    }
    showVideo(req, res) {
        AdminService.showVideo(req, res);
    }
    showBlog(req, res) {
        res.render('admin-blog', { layout: 'admin.hbs', title: 'ADMIN-BLOG' });
    }
    createVideo(req, res) {
        AdminService.createVideo(req, res);
    }

    createUser(req, res) {
        AdminService.createUser(req, res);
    }

    createFood(req, res) {
        AdminService.createFood(req, res);
    }

    createBlog(req, res) {
        AdminService.createBlog(req, res);
    }
}

export default new AdminController();
