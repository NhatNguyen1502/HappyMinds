import Video from "../models/Video.js";
import User from "../models/User.js";
import { multipleMongooesToOject } from "../../util/mongoose.js";

class UserService {
	index(req, res) {
		Video.find({})
			.then((videos) => {
				res.render("user", {
					videos: multipleMongooesToOject(videos),
				});
			})
			.catch((err) => {
				res.status(400).json({ err: "ERROR!" });
			});
		// start();
	}

	createVideo = async (payload) => {
		try {
			console.log("user service", payload);
			const newVideo = await Video.insertMany(payload);
			return newVideo;
		} catch (error) {
			console.log(error);
		}
	};

	getUser = async (payload) => {
		try {
			const user = await User.findOne({ email: payload.email });
			return user;
		} catch (error) {
			console.log(error);
		}
	};

	createUser = async (payload) => {
		try {
			const newUser = await User.create(payload);
			return newUser;
		} catch (error) {
			console.log(error);
		}
	};
}

export default new UserService();
