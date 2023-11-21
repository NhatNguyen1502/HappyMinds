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
            .then(() => res.redirect('/admin/admin-video'))
            .catch((err) => console.log(err));
    };
    createUser = async (req, res) => {
        const formData = req.body;
        const saveUser = await User.create(formData);
        saveUser
            .save()
            .then(() => res.redirect('/admin/admin-user'))
            .catch((err) => console.log(err));
    };
    createFood = async (req, res) => {
        const formData = req.body;
        const saveFood = await Food.create(formData);
        saveFood
            .save()
            .then(() => res.redirect('/admin/admin-food'))
            .catch((err) => console.log(err));
    };
    createBlog = async (req, res) => {
        const formData = req.body;
        const saveBlog = await Blog.create(formData);
        saveBlog
            .save()
            .then(() => res.redirect('/admin/admin-blog'))
            .catch((err) => console.log(err));
    };
    showVideos(req, res) {
        Video.find({}).then((videos) => {
            res.render('admin-video', {
                videos: multipleMongooesToOject(videos),
                layout: 'admin.hbs',
                title: 'ADMIN-VIDEO',
            });
        });
    }

    updateVideo = async (req, res) => {
        try {
            const { title, videoId, caloriesAmount, level, category, sex, BMItype } =
                req.body;
            const updatedVideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    videoId: videoId,
                    title: title,
                    caloriesAmount: caloriesAmount,
                    level: level,
                    category: category,
                    sex: sex,
                    BMItype: BMItype,
                    duration: duration,
                    image: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA3BDVGf8B0taC4h-qjJm4wYxbnsw`,
                },
                { new: true },
            );
            res.redirect('/admin/admin-video');
        } catch (err) {
            console.log(err);
        }
    };

    deleteVideo = async (req, res) => {
        const id = req.params.id;
        try {
            const video = await Video.findById(id);
            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }
            await video.deleteOne();
            res.redirect('/admin/admin-video');
        } catch (err) {
            console.log(err);
        }
    };
    
    showFoods(req, res) {
        Food.find({}).then((foods) => {
            res.render('admin-food', {
                foods: multipleMongooesToOject(foods),
                layout: 'admin.hbs',
                title: 'ADMIN-FOOD',
            });
        });
    }

    updateFood = async (req, res) => {
        try {
            const { name, description, calo, img } =
                req.body;
            const updatedFood = await Food.findByIdAndUpdate(
                req.params.id,
                {
                    name: name,
                    description: description,
                    calo: calo,
                    img: img,
                },
                { new: true },
            );
            res.redirect('/admin/admin-food');
        } catch (err) {
            console.log(err);
        }
    };

    deleteFood = async (req, res) => {
        const id = req.params.id;
        try {
            const food = await Food.findById(id);
            if (!food) {
                return res.status(404).json({ message: 'Food not found' });
            }
            await food.deleteOne();
            res.redirect('/admin/admin-food');
        } catch (err) {
            console.log(err);
        }
    };
}

export default new AdminService();
