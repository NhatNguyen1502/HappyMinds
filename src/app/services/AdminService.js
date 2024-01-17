import Video from "../models/Video.js";
import User from "../models/User.js";
import Food from "../models/Food.js";
import Blog from "../models/Blog.js";
import { generateTitle } from "../../util/generateSlug.js";
import { removeVietnameseTones } from "../../util/generateSlug.js";
import { Slug } from "../../util/generateSlug.js";
import Comment from "../models/Comment.js";
import { multipleMongooesToOject } from "../../util/mongoose.js";

class AdminService {
	createVideo = async (req, res) => {
		const formData = req.body;
		formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLA3BDVGf8B0taC4h-qjJm4wYxbnsw`;
		const saveVideo = await Video.create(formData);
		saveVideo
			.save()
			.then(() => res.redirect("/admin/admin-video"))
			.catch((err) => console.log(err));
	};
	createUser = async (req, res) => {
		const formData = req.body;
		const saveUser = await User.create(formData);
		saveUser
			.save()
			.then(() => res.redirect("/admin/admin-user"))
			.catch((err) => console.log(err));
	};
	createFood = async (req, res) => {
		const formData = req.body;
		const saveFood = await Food.create(formData);
		saveFood
			.save()
			.then(() => res.redirect("/admin/admin-food"))
			.catch((err) => console.log(err));
	};
	createBlog = async (req, res) => {
		let formData = req.body;
		formData.title = generateTitle(req.body.title);
        console.log(formData.title = generateTitle(req.body.title));

		let oldSlug = removeVietnameseTones(req.body.title);
        console.log(oldSlug)
		let newSlug = Slug.generateSlug(oldSlug);
		console.log(newSlug);
		formData.slug = newSlug;
        let checkSlug = await Blog.countDocuments({ slug: newSlug });
        if (checkSlug > 0) {
            let i = 1;
            while (checkSlug > 0) {
                oldSlug += '-' + i++;
                newSlug = Slug.generateSlug(oldSlug);
                checkSlug = await Blog.countDocuments({
                    slug: newSlug,
                });
            }
        }
        formData.slug = newSlug;
        console.log(formData.slug)
		const saveBlog = await Blog.create(formData);
		console.log(formData)
		saveBlog
			.save()
			.then(() => res.redirect("/admin/admin-blog"))
			.catch((err) => console.log(err));
	};
	showVideos = async (req, res) => {
		const page = parseInt(req.query.page) || 1;
		const perPage = 10;
		Video.find({})
			// .skip((page - 1) * perPage)
			// .limit(perPage)
			.then((videos) => {
				res.render("admin-video", {
					videos: multipleMongooesToOject(videos),
					layout: "admin.hbs",
					title: "ADMIN-VIDEO",
				});
			});
	};

    updateVideo = async (req, res) => {
        try {
            const {
                title,
                videoId,
                caloriesAmount,
                level,
                category,
                sex,
                BMItype,
                duration,
            } = req.body;
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

    showFoods = async (req, res) => {
        const totalItems = await Food.countDocuments();
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        Food.find({})
            // .skip((page - 1) * perPage)
            // .limit(perPage)
            .then((foods) => {
                console.log(foods.length);
                res.render('admin-food', {
                    foods: multipleMongooesToOject(foods),
                    layout: 'admin.hbs',
                    title: 'ADMIN-FOOD',
                    totalPages: Math.ceil(totalItems / perPage),
                });
            });
    };

    updateFood = async (req, res) => {
        try {
            const { name, description, calo, img } = req.body;
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

    showBlog(req, res) {
        Blog.find({}).then((blog) => {
            res.render('admin-blog', {
                blog: multipleMongooesToOject(blog),
                layout: 'admin.hbs',
                title: 'ADMIN-BLOG',
            });
        });
    }

    updateBlog = async (req, res) => {
        try {
            const { content, image, title, slug } = req.body;
            const updatedBlog = await Blog.findByIdAndUpdate(
                req.params.id,
                {
                    content: content,
                    image: image,
                    title: title,
                    slug: slug,
                },
                { new: true },
            );
            res.redirect('/admin/admin-blog');
        } catch (err) {
            console.log(err);
        }
    };

    deleteBlog = async (req, res) => {
        const id = req.params.id;
        try {
            const blog = await Blog.findById(id);
            if (!blog) {
                return res.status(404).json({ message: 'Blog not found' });
            }
            await blog.deleteOne();
            res.redirect('/admin/admin-blog');
        } catch (err) {
            console.log(err);
        }
    };

    showUsers(req, res) {
        User.find({}).then((users) => {
            console.log(users.length);
            res.render('admin-user', {
                users: multipleMongooesToOject(users),
                layout: 'admin.hbs',
                title: 'ADMIN-USER',
            });
        });
    }

    showComments(req, res) {
        Comment.find({}).then((comments) => {
            res.render('admin-comment', {
                comments: multipleMongooesToOject(comments),
                layout: 'admin.hbs',
                title: 'ADMIN-COMMENT',
            });
        });
    }

    updateComment = async (req, res) => {
        try {
            const id = req.body.id;
            const comment = { content: req.body.content };
            if (req.file?.path) comment.imgUrl = req.file.path;
            const response = await Comment.findByIdAndUpdate(id, comment, {
                new: true,
            }).lean();
            const comments = await Comment.find({}).lean();
            res.json(comments);
        } catch (err) {
            console.log(err);
        }
    };

    deleteComment = async (req, res) => {
        const id = req.params.id;
        try {
            await Comment.findByIdAndDelete(id);
            const comments = await Comment.find({}).lean();
            res.json(comments);
        } catch (err) {
            console.log(err);
        }
    };

    deleteUser = async (req, res) => {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'user not found' });
            }
            await user.deleteOne();
            res.redirect('/admin/admin-user');
        } catch (err) {
            console.log(err);
        }
    };
}

export default new AdminService();
