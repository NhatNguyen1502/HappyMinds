import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema(
    {
        name: { type: String },
        email: { type: String },
        age: { type: Number },
        height: { type: Number },
        weight: { type: Number },
        sex: { type: String },
        pal: { type: String },
        userCaloriesAmount: { type: Number },
        requiredCaloriesAmount: { type: Number },
        choseFoode: { type: [] },
        photoUrl: { type: String },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', User);
