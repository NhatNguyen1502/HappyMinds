import express from 'express';
import videoController from '../app/controllers/VideoController.js';

const router = express.Router();

router.get('/:id', videoController.show);

export default router;
