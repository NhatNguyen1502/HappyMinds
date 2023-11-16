import homepageRouter from './homepage.js';
import userRouter from './user.js';
import videoRouter from './video.js';
import adminRouter from './admin.js';

export function route(app) {
    app.use('/homepage', homepageRouter);
    app.use('/video', videoRouter);

    app.use('/video', videoRouter);

    app.use('/admin', adminRouter);

    app.get('/', (req, res) => {
        res.render('homepage');
    });

    app.use('/user', userRouter);
}
