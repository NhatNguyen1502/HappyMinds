import express from 'express';
import VideoController from '../app/controllers/VideoController';

const router = express.Router();

router.get('/', VideoController.show );


export default router;
