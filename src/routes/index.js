import homepageRouter from './homepage.js';
import userRouter from './user.js';
import videoRouter from './video.js';
import adminRouter from './admin.js';
import foodcaloriesRouter from './foodcalories.js';

export function route(app) {
    app.use('/homepage', homepageRouter);
    // app.get('/homepage', (req, res) => {res.render('homepage');});

    app.use('/video', videoRouter);

    app.use('/admin', adminRouter);

    app.use('/food', foodcaloriesRouter);

    app.get('/', (req, res) => {
        res.render('homepage');
    });

    app.use('/user', userRouter);
}
