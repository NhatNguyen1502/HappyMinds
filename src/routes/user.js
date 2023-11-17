import express from 'express';
import userController from '../app/controllers/userController.js';
import { ensureAuth, ensureGuest } from '../middleware/auth.js';

const router = express.Router();

router.get('/', userController.index);

router.get('/', ensureGuest, (req, res) => {
    res.render('homepage');
});

router.get('/', ensureAuth, async (req, res) => {
    res.render('user', { userinfo: req.user });
});

export default router;
