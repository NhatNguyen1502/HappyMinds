import UserService from '../services/UserService.js';

class UserController {
    index(req, res) {
        UserService.index(req, res);
    }
    updateUser(req, res) {
        UserService.updateUser(req, res);
    }
    removeFood(req, res) {
        UserService.removeFood(req, res);
    }
}

export default new UserController();
