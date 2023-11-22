import express from 'express';
import BlogDetailCotroller from '../app/controllers/BlogDetailController.js';
const router = express.Router();

// router.get('/', blogDetailController);
router.get('/:slug', BlogDetailCotroller.show);

export default router;
