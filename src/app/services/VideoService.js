import Video from '../models/Video.js';
import { mongooesToOject } from '../../util/mongoose.js';

class VideoService {
    index(req, res) {
        Video.findOne({ videoId: req.params.id })
            .then((video) => {
                res.render('./videos/show', {
                    video: mongooesToOject(video),
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}

export default new VideoService();
