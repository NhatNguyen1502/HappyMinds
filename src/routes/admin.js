import express from 'express';
import adminController from '../app/controllers/AdminController.js';

const router = express.Router();

router.get('/', adminController.index);
router.get('/admin-user', adminController.index);
router.get('/admin-food', adminController.showFoods);
router.get('/admin-video', adminController.showVideos);
router.get('/admin-blog', adminController.showBlog);
router.post('/video', adminController.createVideo);
router.post('/user', adminController.createUser);
router.post('/food', adminController.createFood);
router.post('/blog', adminController.createBlog);

router.get('/create', (req, res) => res.render('admin'));

router.post('/update-video/:id', adminController.updateVideo);

router.post('/delete-video/:id', adminController.deleteVideo);

router.post('/update-food/:id', adminController.updateFood);

router.post('/delete-food/:id', adminController.deleteFood);

export default router;
