import express from "express";
import homepageController from "../resources/app/controllers/homepageController.js";

const router = express.Router();

router.use('/:slug', homepageController.show);
router.use('/', homepageController.index);

export default router;

