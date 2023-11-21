import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Food = new Schema(
    {
        name: { type: String },
        img: { type: String},
        description: { type: String},
        calo: { type: Number },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Food', Food);
