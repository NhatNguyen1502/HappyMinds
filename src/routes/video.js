import express from 'express';
import videoController from '../resources/app/controllers/videoController.js';

const router = express.Router();

router.get('/', videoController.showVideo);



export default router;
