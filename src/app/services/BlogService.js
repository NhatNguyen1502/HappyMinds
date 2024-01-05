import blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class BlogService {
    index(req, res) {
        const itemsPerPage = 3;

        blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            blog.find({})
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

        blog.countDocuments().then((count) => {
            const totalPages = Math.ceil(count / itemsPerPage);

            blog.find({})
                .skip((currentPage - 1) * itemsPerPage)
                .limit(itemsPerPage)
                .lean()
                .then((blogs) => {
                    res.json({ blogs, totalPages });
                })
                .catch((err) => {
                    res.status(500).json({ err: 'ERROR!' });
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
                console.log("id = ",blog._id);
                Comment.findOne({ idBlog: blog._id})
                    .then(comment => {
                        console.log("comment = ",comment);
                        res.render('blogDetail', {
                            blog: mongooesToOject(blog),
                            isLogin,
                            comment: mongooesToOject(comment),
                        });
                    })
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' }); 
            });
    }
}

export default new BlogService();
