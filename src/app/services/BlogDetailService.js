import blog from '../models/Blog.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class BlogDetailService {
    show(req, res) {
        blog.findOne({ slug: req.params.slug })
            .then((blog) => {
                res.render('blogDetail', {
                    blog: mongooesToOject(blog),
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}

export default new BlogDetailService();
