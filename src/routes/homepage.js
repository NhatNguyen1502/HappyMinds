import express from 'express';
import homepageController from '../app/controllers/HomepageController.js';

const router = express.Router();

router.get('/video', homepageController.showVideo);
router.get('/', homepageController.index);



export default router;
