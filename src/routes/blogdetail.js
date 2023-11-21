import express from 'express';
import BlogDetailCotroller from '../app/controllers/BlogDetailCotroller.js';
const router = express.Router();

// router.get('/', blogDetailController);
router.get('/', BlogDetailCotroller.show);


export default router;
