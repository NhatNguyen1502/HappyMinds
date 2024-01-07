import CommentService from '../services/CommentService.js';
class CommentController {
    createComment = CommentService.createComment;
    getBlogComment = CommentService.getBlogComments;
}

export default new CommentController();
