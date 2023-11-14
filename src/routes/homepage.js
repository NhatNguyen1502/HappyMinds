import express from 'express';
import homepageController from '../resources/app/controllers/homepageController.js';

const router = express.Router();

router.get('/video', homepageController.showVideo);
router.get('/', homepageController.index);



export default router;
