import express from 'express';
import adminController from '../resources/app/controllers/adminController.js';

const router = express.Router();

router.get('/', adminController.index);
router.get('/admin-user', adminController.index);
router.get('/admin-food', adminController.showFood);
router.get('/admin-video', adminController.showVideo);
router.get('/admin-blog', adminController.showBlog);

export default router;
