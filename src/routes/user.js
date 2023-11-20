import express from 'express';
import userController from '../app/controllers/UserController.js';

const router = express.Router();

router.get('/', userController.index);

// router.post('/', userController.createVideo);

export default router;
