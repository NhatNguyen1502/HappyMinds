import express from 'express';
import BlogDetailController from '../app/controllers/BlogDetailController.js';

const router = express.Router();

router.get('/', BlogDetailController.index );

export default router;
