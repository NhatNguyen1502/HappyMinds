import adminService from '../services/AdminService.js';

class AdminController {
    index(req, res) {
        res.render('admin-user', { layout: 'admin.hbs', title: 'ADMIN-USER' });
    }
    showFood(req, res) {
        res.render('admin-food', { layout: 'admin.hbs', title: 'ADMIN-FOOD' });
    }
    showVideo(req, res) {
        adminService.showVideo(req, res);
    }
    showBlog(req, res) {
        res.render('admin-blog', { layout: 'admin.hbs', title: 'ADMIN-BLOG' });
    }
}

export default new AdminController();
