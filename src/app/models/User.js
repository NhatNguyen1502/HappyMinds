import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String },
        age: { type: Number },
        height: { type: Number },
        weight: { type: Number },
        sex: { type: String },
        category: { type: String },
        activityRatios: { type: String },
        userCaloriesAmount: { type: Number },
        requiredCaloriesAmount: { type: Number },
        choseFoode: { type: [] },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', User);
