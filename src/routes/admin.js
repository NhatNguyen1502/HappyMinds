import express from 'express';
import adminController from '../app/controllers/AdminController.js';

const router = express.Router();

router.post('/video', adminController.createVideo);
router.post('/user', adminController.createUser);
router.post('/food', adminController.createFood);
router.post('/blog', adminController.createBlog);

router.get('/', adminController.show);

export default router;
