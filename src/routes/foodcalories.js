import express from 'express';
import FoodCaloriesController from '../app/controllers/FoodCaloriesController.js';

const router = express.Router();

router.get('/', FoodCaloriesController.show);
router.post('/', FoodCaloriesController.addToMenu);


export default router;
