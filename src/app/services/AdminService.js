import Video from "../models/Video.js";
import User from "../models/User.js";
import Food from "../models/Food.js";
import Blog from "../models/Blog.js";
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
		const formData = req.body;
		const saveBlog = await Blog.create(formData);
		saveBlog
			.save()
			.then(() => res.redirect("/admin/admin-blog"))
			.catch((err) => console.log(err));
	};
	showVideos = async (req, res) => {
		const page = parseInt(req.query.page) || 1;
		const perPage = 10;
		Video.find({})
			.skip((page - 1) * perPage)
			.limit(perPage)
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
			const { title, videoId, caloriesAmount, level, category, sex, BMItype, duration } = req.body;
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
				{ new: true }
			);
			res.redirect("/admin/admin-video");
		} catch (err) {
			console.log(err);
		}
	};

	deleteVideo = async (req, res) => {
		const id = req.params.id;
		try {
			const video = await Video.findById(id);
			if (!video) {
				return res.status(404).json({ message: "Video not found" });
			}
			await video.deleteOne();
			res.redirect("/admin/admin-video");
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
				res.render("admin-food", {
					foods: multipleMongooesToOject(foods),
					layout: "admin.hbs",
					title: "ADMIN-FOOD",
					totalPages: Math.ceil(totalItems / perPage),
				});
			});
	};

	updateFood = async (req, res) => {
		try {
			console.log(req.body)
			const { id, name, description, calo, img } = req.body;
			const updatedFood = await Food.findByIdAndUpdate(
				req.body.id,
				{
					name: name,
					description: description,
					calo: calo,
					img: img,
				},
				{ new: true }
			);
			res.redirect("/admin/admin-food");
		} catch (err) {
			console.log(err);
		}
	};

	deleteFood = async (req, res) => {
		const id = req.params.id;
		try {
			const food = await Food.findById(id);
			if (!food) {
				return res.status(404).json({ message: "Food not found" });
			}
			await food.deleteOne();
			res.redirect("/admin/admin-food");
		} catch (err) {
			console.log(err);
		}
	};

	showBlog(req, res) {
		Blog.find({}).then((blog) => {
			res.render("admin-blog", {
				blog: multipleMongooesToOject(blog),
				layout: "admin.hbs",
				title: "ADMIN-BLOG",
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
				{ new: true }
			);
			res.redirect("/admin/admin-blog");
		} catch (err) {
			console.log(err);
		}
	};

	deleteBlog = async (req, res) => {
		const id = req.params.id;
		try {
			const blog = await Blog.findById(id);
			if (!blog) {
				return res.status(404).json({ message: "Blog not found" });
			}
			await blog.deleteOne();
			res.redirect("/admin/admin-blog");
		} catch (err) {
			console.log(err);
		}
	};

	showUsers(req, res) {
		User.find({}).then((users) => {
			console.log(users.length);
			res.render("admin-user", {
				users: multipleMongooesToOject(users),
				layout: "admin.hbs",
				title: "ADMIN-USER",
			});
		});
	}

	deleteUser = async (req, res) => {
		const id = req.params.id;
		try {
			const user = await User.findById(id);
			if (!user) {
				return res.status(404).json({ message: "user not found" });
			}
			await user.deleteOne();
			res.redirect("/admin/admin-user");
		} catch (err) {
			console.log(err);
		}
	};
}

export default new AdminService();
