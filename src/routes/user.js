import express from 'express';
import userController from '../resources/app/controllers/userController.js';

const router = express.Router();

router.get('/', userController.show);

export default router;
