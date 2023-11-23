import Video from '../models/Video.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class HomepageService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        Video.find({})
            .then((videos) => {
                res.render('homepage', {
                    videos: multipleMongooesToOject(videos).slice(0, 3),
                    isLogin,
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
    checkBMI(req, res) {
        let height = req.body.height / 100;
        let weight = req.body.weight;
        let BMI = weight / (height * height);

        res.send(`BMI: ${BMI}`);
    }
}

export default new HomepageService();
