import mongoose, { model } from 'mongoose';

let pass = 'SKLJcsydeV5PbPJ0';

async function connect() {
    try {
        await mongoose.connect(
            `mongodb+srv://happymindspnv:${pass}@happyminds.ctjhbue.mongodb.net/?retryWrites=true&w=majority`,
            {
                useNewUrlParser: true,
            },
        );
        console.log('connect database successfully!');
    } catch (error) {
        console.log('connect database failure!', error);
    }
}

export { connect };
