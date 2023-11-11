import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Video = new Schema({
    title: { type: String },
    activity_vario: { type: Number },
    calories_amount: { type: Number },
    URL: { type: String },
    level: { type: String },
});

export default mongoose.model('Video', Video);
