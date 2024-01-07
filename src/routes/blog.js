import express from 'express';
import BlogController from '../app/controllers/BlogController.js';

const router = express.Router();

router.get('/', BlogController.index);

router.post('/create', BlogController.createBlog);

router.get('/blogDetail/:slug', BlogController.showDetail);

export default router;
