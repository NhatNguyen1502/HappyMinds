import Video from "../models/Video.js";
// const mongoose = require('mongoose');
import UserService from "../services/UserService.js";

class UserController {
	index(req, res) {
		Video.find({})
			.then((result) => {
				res.json(result);
				console.log(result);
			})
			.catch((err) => {
				res.status(400).json({ err: "ERROR!" });
				console.log(err);
			});
	}

	createVideo = async (req, res) => {
		const saveUser = await UserService.createVideo(req.body);
		res.json(saveUser);
	};
}

export default new UserController();
