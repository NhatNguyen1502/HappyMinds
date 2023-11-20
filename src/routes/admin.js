import express from 'express';
import adminController from '../app/controllers/AdminController.js';

const router = express.Router();

router.get('/', adminController.index);
router.get('/admin-user', adminController.index);
router.get('/admin-food', adminController.showFood);
router.get('/admin-video', adminController.showVideo);
router.get('/admin-blog', adminController.showBlog);
router.post('/video', adminController.createVideo);
router.post('/user', adminController.createUser);
router.post('/food', adminController.createFood);
router.post('/blog', adminController.createBlog);

router.get('/create', (req, res) => res.render('admin'));

export default router;
