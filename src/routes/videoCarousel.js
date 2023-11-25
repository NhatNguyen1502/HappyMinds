import express from 'express';
import VideoCarouselController from '../app/controllers/VideoCarouselController.js';

const router = express.Router();

router.get('/', VideoCarouselController.index);

export default router;
