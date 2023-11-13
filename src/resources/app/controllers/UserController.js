import Video from '../models/Video.js';
// const mongoose = require('mongoose');

class UserController {
    index(req, res) {
        Video.find({})
            .then((result) => {
                res.json(result);
                console.log(result);
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
                console.log(err);
            });
    }
}

export default new UserController();
