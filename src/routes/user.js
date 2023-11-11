import express from 'express';
import userController from '../resources/app/controllers/userController.js';

const router = express.Router();

router.get('/', userController.index);

export default router;
