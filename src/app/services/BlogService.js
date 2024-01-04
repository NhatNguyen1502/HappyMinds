import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
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

        Blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            if (currentPage <= 0) {
                currentPage = 1;
            } else if (currentPage > totalPages) {
                currentPage = totalPages;
            }

            Blog.find({})
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)

                .then((blogs) => {
                    blogs = multipleMongooesToOject(blogs);

                    res.render('blog', {
                        blogs,
                        isLogin,
                        currentPage,
                        totalPages,
                    });
                })
                .catch((err) => {
                    res.status(400).json({ err: 'ERROR!' });
                });
        });
    }

    async showDetail(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }

        Blog = await blog.findOne({ slug: req.params.slug });
        console.log('content = ', blog.content);
        Comments = Blog.findOne({ slug: req.params.slug })
            .then((blog) => {
                Comment.findOne({ idBlog: blog._id }).then((comment) => {
                    console.log('comment = ', comment);
                    res.render('blogDetail', {
                        blog: mongooesToOject(blog),
                        isLogin,
                        comment: mongooesToOject(comment),
                    });
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}

export default new BlogService();
