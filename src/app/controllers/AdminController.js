import AdminService from '../services/AdminService.js';

class AdminController {
    show(req, res) {
        res.render('admin');
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
