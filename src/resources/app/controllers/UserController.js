import Video from '../models/Video.js';

class UserController {
    index(req, res) {
        Video.find({})
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}

export default new UserController();
