import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Blog = new Schema(
    {
        title: { type: String },
        content: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'title', unique: true },
        author : { type : String },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Blog', Blog);