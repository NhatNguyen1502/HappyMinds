import UserService from '../services/UserService.js';

class UserController {
    index(req, res) {
        UserService.index(req, res);
    }
}

export default new UserController();
