import Video from '../models/Video.js';
import User from '../models/User.js';
import Food from '../models/Food.js';
import Blog from '../models/Blog.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class AdminService {
    createVideo = async (req, res) => {
        const formData = req.body;
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA3BDVGf8B0taC4h-qjJm4wYxbnsw`;
        const saveVideo = await Video.create(formData);
        saveVideo
            .save()
            .then(() => res.redirect('/user'))
            .catch((err) => console.log(err));
    };
    createUser = async (req, res) => {
        const formData = req.body;
        const saveUser = await User.create(formData);
        saveUser
            .save()
            .then(() => res.redirect('/user'))
            .catch((err) => console.log(err));
    };
    createFood = async (req, res) => {
        const formData = req.body;
        const saveFood = await Food.create(formData);
        saveFood
            .save()
            .then(() => res.redirect('/user'))
            .catch((err) => console.log(err));
    };
    createBlog = async (req, res) => {
        const formData = req.body;
        const saveBlog = await Blog.create(formData);
        saveBlog
            .save()
            .then(() => res.redirect('/user'))
            .catch((err) => console.log(err));
    };
    showVideo(req, res) {
        Video.find({}).then((videos) => {
            res.render('admin-video', {
                videos: multipleMongooesToOject(videos),
                layout: 'admin.hbs',
                title: 'ADMIN-VIDEO',
            });
        });
    }
}

export default new AdminService();
