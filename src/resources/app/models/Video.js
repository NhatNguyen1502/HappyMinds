import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Video = new Schema(
	{
		title: { type: String },
		calories_amount: { type: Number },
		URL: { type: String },
		level: { type: String },
		category: { type: String },
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Video", Video);
