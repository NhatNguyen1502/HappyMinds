import CommentService from '../services/CommentService.js';
class CommentController {
    createComment = CommentService.createComment;
    getBlogComments = CommentService.getBlogComments;
    getReplyComments = CommentService.getReplyComments;
}

export default new CommentController();
