import blog from '../models/Blog.js';
import {
    multipleMongooesToOject,
    mongooesToOject,
} from '../../util/mongoose.js';

class BlogService {
    index(req, res) {
        blog.find({})
            .then((blogs) => {
                blogs = multipleMongooesToOject(blogs);
                res.render('blog', { blogs });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
}

export default new BlogService();
