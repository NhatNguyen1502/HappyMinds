import express from 'express';
import BLogController from '../app/controllers/BLogController.js';

const router = express.Router();

router.get('/', BLogController.show);

export default router;
