import Video from '../models/Video.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class UserService {
    index(req, res) {
        Video.find({})
            .then((videos) => {
                res.render('user', {
                    videos: multipleMongooesToOject(videos),
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
        // start();
    }

    createVideo = async (payload) => {
        try {
            console.log('user service', payload);
            const newVideo = await Video.insertMany(payload);
            return newVideo;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new UserService();
