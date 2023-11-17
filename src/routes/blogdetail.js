import express from 'express';
import BlogDetailController from '../app/controllers/BlogDetailController.js';
const router = express.Router();

router.get('/', BlogDetailController.show);


export default router;
