import express from 'express';
import adminController from '../app/controllers/AdminController.js';

const router = express.Router();

router.post('/', adminController.create);
router.get('/', adminController.show);

export default router;
