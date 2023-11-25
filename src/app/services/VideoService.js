import Video from '../models/Video.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class VideoService {
    index(req, res) {
        Video.find({})
            .then((videos) => {
                let isLogin = false;
                if (req.isAuthenticated()) {
                    isLogin = true;
                }
                videos = multipleMongooesToOject(videos);
                let level_1 = videos.filter(
                    (video) => video.level == 'beginner',
                );
                let armsLevel_1 = level_1.filter(
                    (video) => video.category == 'arms',
                );
                let absLevel_1 = level_1.filter(
                    (video) => video.category == 'abs',
                );
                let shoulderLevel_1 = level_1.filter(
                    (video) => video.category == 'shoulder',
                );
                let chestLevel_1 = level_1.filter(
                    (video) => video.category == 'chest',
                );
                let legsLevel_1 = level_1.filter(
                    (video) => video.category == 'legs',
                );

                let level_2 = videos.filter((video) => video.level == 'medium');
                let armsLevel_2 = level_2.filter(
                    (video) => video.category == 'arms',
                );
                let absLevel_2 = level_2.filter(
                    (video) => video.category == 'abs',
                );
                let shoulderLevel_2 = level_2.filter(
                    (video) => video.category == 'shoulder',
                );
                let chestLevel_2 = level_2.filter(
                    (video) => video.category == 'chest',
                );
                let legsLevel_2 = level_2.filter(
                    (video) => video.category == 'legs',
                );
                console.log(req.user);
                res.render('video', {
                    armsLevel_1,
                    absLevel_1,
                    shoulderLevel_1,
                    chestLevel_1,
                    legsLevel_1,
                    armsLevel_2,
                    absLevel_2,
                    shoulderLevel_2,
                    chestLevel_2,
                    legsLevel_2,
                    isLogin,
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    show(req, res) {
        Video.findOne({ videoId: req.params.id })
            .then((video) => {
                let isLogin = false;
                if (req.isAuthenticated()) {
                    isLogin = true;
                }
                res.render('./videos/show', {
                    video: mongooesToOject(video),
                    isLogin,
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    showBMIList(req, res){
        
    }
}

export default new VideoService();
