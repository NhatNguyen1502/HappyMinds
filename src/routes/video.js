import express from 'express';
import VideoController from '../app/controllers/VideoController';

const router = express.Router();

router.get('/', videoController.show);
router.get('/:id', videoController.show);

export default router;
