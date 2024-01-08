import Comment from '../models/Comment.js';

class CommentService {
    async createComment(req, res) {
        const comment = req.body;
        comment.imgUrl = req.file?.path || '';
        if (comment.parent) {
            await updateResponseComment(comment.parent);
        }
        Comment.create(comment)
            .then((comment) => res.json('Send comment successfully!'))
            .catch((err) => res.json(err));
    }

    updateResponseComment(id) {
        Comment.findByIdAndUpdate(
            { _id: id },
            { $inc: { responseTimes: 1 } },
            { new: true },
        )
            .then((comment) => {
                console.log(comment);
            })
            .catch((err) => {
                console.log(err);
            });
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
