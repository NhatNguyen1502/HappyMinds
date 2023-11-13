import UserService from '../services/UserService.js';

class UserController {
    index(req, res) {
        UserService.index(req, res);
    }

    createVideo = async (req, res) => {
        const saveUser = await UserService.createVideo(req.body);
        res.json(saveUser);
    };
}

export default new UserController();
