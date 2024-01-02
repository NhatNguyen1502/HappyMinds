import express from 'express';
import FoodCaloriesController from '../app/controllers/FoodCaloriesController.js';

const router = express.Router();

router.get('/search', FoodCaloriesController.search);
router.get('/:slug', FoodCaloriesController.sort);
router.get('/', FoodCaloriesController.show);
router.post('/', FoodCaloriesController.addToMenu);

export default router;
