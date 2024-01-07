import express from 'express';
import BlogController from '../app/controllers/BlogController.js';

const router = express.Router();
router.get('/showPanigation', BlogController.showPanigation);

router.get('/', BlogController.index);

router.get('/blogDetail/:slug', BlogController.showDetail);

export default router;
