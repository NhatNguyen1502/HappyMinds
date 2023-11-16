import express from 'express';
import videoController from "../app/controllers/VideoController.js"

const router = express.Router();

router.get('/', videoController.showVideo);


export default router;
