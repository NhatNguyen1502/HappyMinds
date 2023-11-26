import express from 'express';
import userController from '../app/controllers/UserController.js';

const router = express.Router();

router.get('/', userController.index);
router.post('/', userController.updateUser);
router.post('/:idFood', userController.removeFood);

export default router;
