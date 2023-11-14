import homepageRouter from './homepage.js';
import videoRouter from './video.js'
import userRouter from './user.js';

export function route(app) {
    app.use('/homepage', homepageRouter);
    app.use('/video', videoRouter);

    app.get('/', (req, res) => {
        res.render('homepage');
    });

    app.use('/user', userRouter);
}
