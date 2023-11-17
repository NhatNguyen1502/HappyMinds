import Video from "../models/Video.js";
import {
  mongooesToOject,
  multipleMongooesToOject,
} from "../../util/mongoose.js";

class AdminService {
  createVideo = async (req, res) => {
    const formData = req.body;
    re;
    const saveVideo = await Video.insertMany(formData);
  };

  showVideo(req, res) {
    Video.find({}).then((videos) => {
      res.render("admin-video", {
        videos: multipleMongooesToOject(videos),
        layout: "admin.hbs",
        title: "ADMIN-VIDEO",
      });
    });
  }
}

export default new AdminService();
