import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/login', (req, res) => {
    // if (req.user) {
    // 	res.redirect("/profile");
    // }
    res.render('loginpage');
});

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log('User authenticated:', req.user);
    res.redirect('/user');
});

router.get('/logout', (req, res) => {
    // if (req.isAuthenticated()) {
    //     req.logout(function (err) {
    //         if (err) {
    //             return next(err);
    //         }
    //         res.redirect('/');
    //     });
    //     req.session.destroy((err) => {
    //         if (err) {
    //             console.log('Error destroying session: ', err);
    //         }
    //         res.redirect('/');
    //     });
    // } else {
    //     res.redirect('/');
    // }
    req.logOut((err) => {
        if (err) {
            return res
                .status(500)
                .json({ message: 'Đăng xuất không thành công.' });
        }
        res.redirect('/');
    });
});

export default router;
