import Comment from '../models/Comment.js';

class CommentService {
    constructor() {
        this.createComment = this.createComment.bind(this);
    }

    async createComment(req, res) {
        const comment = req.body;
        comment.imgUrl = req.file?.path || '';
        if (comment.parentId) {
            this.updateResponseComment(comment.parentId);
        }
        Comment.create(comment)
            .then((comment) => res.json('Send comment successfully!'))
            .catch((err) => res.json(err));
    }

    updateResponseComment = async (id) => {
        try {
            const comment = await Comment.findByIdAndUpdate(
                { _id: id },
                { $inc: { responseTimes: 1 } },
                { new: true },
            ).exec();
        } catch (err) {
            console.log(err);
        }
    };

    getBlogComments = (req, res) => {
        const blogId = req.query.blogId;
        Comment.find({ blogId })
            .sort({ createdAt: -1 })
            .then((comments) => res.json(comments))
            .catch((err) => res.json(err));
    };

    getReplyComments = (req, res) => {
        const parentId = req.query.parentId;
        Comment.find({ parentId })
            .then((comments) => res.json(comments))
            .catch((err) => res.jon(err));
    };
}

export default new CommentService();
