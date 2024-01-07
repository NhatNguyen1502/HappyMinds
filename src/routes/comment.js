import express from 'express';
import CommentController from '../app/controllers/CommentController.js';
import fileUploader from '../middlerwares/cloudinary.js';

const router = express.Router();

router.get('/getBlogComment', CommentController.getBlogComment);
router.post(
    '/',
    fileUploader.single('imgUrl'),
    CommentController.createComment,
);

export default router;
