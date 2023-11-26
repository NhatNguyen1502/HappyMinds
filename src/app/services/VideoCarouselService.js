import Video from '../models/Video.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class VideoCarouselService {
    index(req, res) {
        const videoArrayJSON = req.body.array;
        console.log(videoArrayJSON);
        const videos = JSON.parse(videoArrayJSON);
        res.render('videoCarousel', {videos});
    }
}
export default new VideoCarouselService();
