import Comment from '../models/Comment.js';

class CommentService {
    createComment(req, res) {
        const comment = req.body;
        comment.imgUrl = req.file?.path || '';
        console.log('comment = ', comment);
        Comment.create(comment)
            .then((comment) => res.json('Send comment successfully!'))
            .catch((err) => res.json(err));
    }

    getBlogComments(req, res) {
        const blogId = req.query.blogId;
        Comment.find({ blogId })
            .sort({ createdAt: -1 })
            .then((comments) => res.json(comments))
            .catch((err) => res.json(err));
    }
}

export default new CommentService();