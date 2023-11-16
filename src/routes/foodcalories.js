import express from 'express';
import FoodCaloriesController from '../app/controllers/FoodCaloriesController.js';

const router = express.Router();

router.get('/', FoodCaloriesController.show);

export default router;
