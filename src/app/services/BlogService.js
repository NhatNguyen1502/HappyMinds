import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class BlogService {
    index(req, res) {
        const itemsPerPage = 3;

        Blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            Blog.find({})
                .limit(itemsPerPage)
                .then((blogs) => {
                    blogs = multipleMongooesToOject(blogs);
                    res.render('blog', { blogs, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
                });
        });
    }

    showPanigation(req, res) {
        let currentPage = parseInt(req.query.page);
        const itemsPerPage = 3;

        Blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            Blog.find({})
                .lean()
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then((blogs) => {
                    res.json({ blogs, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
                });
        });
    }

    async showDetail(req, res) {
        let isLogin = req.isAuthenticated() || false;
        let blog = await Blog.findOne({ slug: req.params.slug }).lean();
        res.render('blogDetail', {
            blog,
            isLogin,
        });
    }
}

export default new BlogService();
