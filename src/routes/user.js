import express from 'express';
import userController from '../app/controllers/userController.js';

const router = express.Router();

router.get('/', userController.index);
// router.get('/', userController.show);

// router.post('/', userController.createVideo);

export default router;
