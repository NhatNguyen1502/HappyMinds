import homepageRouter from './homepage.js';
import userRouter from './user.js';
import videoRouter from './video.js';
import adminRouter from './admin.js';
import authRouter from './auth.js';
import { ensureAuth, ensureGuest } from '../middleware/auth.js';

export function route(app) {
    app.get('/', ensureGuest, (req, res) => {
        res.render('homepage');
    });

    app.get('/', ensureAuth, async (req, res) => {
        res.render('user', { userinfo: req.user });
    });

    app.use('/video', videoRouter);

    app.use('/admin', adminRouter);

    app.use('/user', userRouter);

    app.use('/auth', authRouter);
}
