import Video from '../models/Video.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class VideoCarouselService {
    index(req, res) {
        Video.find({})
            .then((videos) => {
                res.render('videoCarousel', {
                    videos: multipleMongooesToOject(videos).slice(0, 10),
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}
export default new VideoCarouselService();
