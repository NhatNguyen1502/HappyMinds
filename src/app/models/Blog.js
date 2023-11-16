import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Blog = new Schema(
    {
        title: { type: String },
        content: { type: String },
        image: { type: String },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Blog', Blog);
