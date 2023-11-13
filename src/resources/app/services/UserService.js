import Video from "../models/Video.js";

class UserService {
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

	createVideo = async (payload) => {
		try {
			console.log("user service", payload);
			const newVideo = await Video.insertMany(payload);

			return newVideo;
		} catch (error) {
			console.log(error);
		}
	};
}

export default new UserService();
