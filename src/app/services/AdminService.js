import Video from '../models/Video.js';
import { mongooesToOject, multipleMongooesToOject } from '../../util/mongoose.js';


class AdminService {
    createVideo = async (req, res) => {
        const formData = req.body;
        re;
        // formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA3BDVGf8B0taC4h-qjJm4wYxbnsw`;
        const saveVideo = await Video.insertMany(formData);
        // saveVideo.save()
        //     .then(() => res.redirect('/user'))
        //     .catch(err => console.log(err));
    };

    showVideo(req, res){
        Video.find({})
            .then((videos) => {
                res.render('admin-video', {
                    videos: multipleMongooesToOject(videos),
                    layout: 'admin.hbs', title: 'ADMIN-VIDEO'
                })
            })
    }
}

export default new AdminService();
