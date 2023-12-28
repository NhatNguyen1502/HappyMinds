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
        blog.find({})
            .then((blogs) => {
                blogs = multipleMongooesToOject(blogs);
                res.render('blog', { blogs, isLogin });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

// code test phân trang
    // index(req, res) {
    //     let isLogin = false;
    //     if (req.isAuthenticated()) {
    //         isLogin = true;
    //     }

    //     const currentPage = parseInt(req.query.page) || 1;
    //     const itemsPerPage = 3;

    //     blog.find({})
    //         .skip((currentPage - 1) * itemsPerPage)
    //         .limit(itemsPerPage)
    //         .then((blogs) => {
    //             blogs = multipleMongooesToOject(blogs);
                
    //             // Tính số lượng trang để hiển thị nút phân trang
    //             blog.countDocuments().then((count) => {
    //                 const totalPages = Math.ceil(count / itemsPerPage);
    //                 res.render('blog', { blogs, isLogin, currentPage, totalPages });
    //             });
    //         })
    //         .catch((err) => {
    //             res.status(400).json({ err: 'ERROR!' });
    //         });
    // }

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
