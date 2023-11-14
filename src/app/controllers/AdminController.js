import AdminService from '../services/AdminService.js';

class AdminController {
    show(req, res) {
        res.render('admin');
    }

    create(req, res) {
        AdminService.createVideo(req, res);
    }
}

export default new AdminController();
