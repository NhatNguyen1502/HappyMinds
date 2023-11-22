import express from 'express';
import BlogController from '../app/controllers/BlogController.js';
import BlogDetailController from '../app/controllers/BlogDetailController.js';

const router = express.Router();

router.get('/', BlogController.index);
router.get('/:slug', BlogDetailController.show);

export default router;
