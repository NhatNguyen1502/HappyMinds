import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema(
    {
        googleId: { type: String },
        email: { type: String },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('User', User);
