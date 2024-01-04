import express from 'express';
import VideoController from '../app/controllers/VideoController.js';

const router = express.Router();
router.get('/viewcoach', VideoController.viewcoach);
router.get('/', VideoController.index);
router.get('/:id', VideoController.show);

export default router;
