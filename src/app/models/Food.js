import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Food = new Schema(
    {
        name: { type: String },
        caloriesAmount: { type: Number },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Food', Food);
