import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/happyminds_dev', {
            useNewUrlParser: true,
        });
        console.log('connect database successfully!');
    } catch (error) {
        console.log('connect database failure!', error);
    }
}

export { connect };
