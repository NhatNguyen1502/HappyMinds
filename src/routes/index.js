import homepageRouter from './homepage.js';
import userRouter from './user.js';
import adminRouter from './admin.js';
import authRouter from './auth.js';
import videoRouter from './video.js';
import foodcaloriesRouter from './foodcalories.js';

export function route(app) {
    app.get('/', (req, res) => res.render('homepage'));

    app.use('/video', videoRouter);

    app.use('/admin', adminRouter);

    app.use('/food', foodcaloriesRouter);

    app.use('/user', userRouter);

    app.use('/auth', authRouter);
}
