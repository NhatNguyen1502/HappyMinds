import express from 'express';
import userController from '../app/controllers/UserController.js';

const router = express.Router();

router.get('/', userController.index);

export default router;
