import blog from '../models/Blog.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class BlogService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }

        let currentPage = parseInt(req.query.page) || 1;
        const itemsPerPage = 3;

        blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            if (currentPage <= 0) {
                currentPage = 1;
            }
            else if (currentPage > totalPages) {
                currentPage = totalPages;
            }

            blog.find({})
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .then((blogs) => {
                    blogs = multipleMongooesToOject(blogs);

                    res.render('blog', { blogs, isLogin, currentPage, totalPages });
                })
                .catch((err) => {
                    res.status(400).json({ err: 'ERROR!' });
                });
        });
    }

    showDetail(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        blog.findOne({ slug: req.params.slug })
            .then((blog) => {
                res.render('blogDetail', {
                    blog: mongooesToOject(blog),
                    isLogin,
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}

export default new BlogService();
