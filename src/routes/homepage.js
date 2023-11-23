import express from 'express';
import homepageController from '../app/controllers/HomepageController.js';
import passport from 'passport';

const router = express.Router();

router.get('/', homepageController.index);
router.post('/:slug', homepageController.showVideos);

router.get('/login', function (req, res) {
    if (!req.user) {
        res.redirect('/');
    } else {
        res.redirect('/user');
    }
});

router.get('/login/federated/google', passport.authenticate('google'));

router.get(
    '/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
    }),
    function (req, res) {
        req.session.user = req.user;
        res.redirect('/user');
    },
);

router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

export default router;
