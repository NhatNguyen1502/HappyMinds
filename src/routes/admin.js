import express from 'express';
import adminController from '../app/controllers/AdminController.js';

const router = express.Router();

router.get('/', adminController.showUsers);
router.get('/admin-food', adminController.showFoods);
router.get('/admin-video', adminController.showVideos);
router.get('/admin-blog', adminController.showBlog);
router.get('/admin-user', adminController.showUsers);
router.post('/video', adminController.createVideo);
router.post('/user', adminController.createUser);
router.post('/food', adminController.createFood);
router.post('/blog', adminController.createBlog);

router.get('/create', (req, res) => res.render('admin'));

router.post('/update-video/:id', adminController.updateVideo);

router.post('/delete-video/:id', adminController.deleteVideo);

router.post('/update-food/:id', adminController.updateFood);

router.post('/delete-food/:id', adminController.deleteFood);

router.post('/update-blog/:id', adminController.updateBlog);

router.post('/delete-blog/:id', adminController.deleteBlog);

router.post('/delete-user/:id', adminController.deleteUser);

router.post('/admin/update-user-status/:id', adminController.updateUserStatus);

export default router;
