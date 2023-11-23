import User from '../models/User.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class UserService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            console.log('Hello', req.user.name);
            isLogin = true;
        } else {
            console.log('Login fail!!!');
        }
        res.render('user', { isLogin });
        this.getUser;
    }

    getUser = async (payload) => {
        try {
            const user = await User.findOne({ email: payload });
            return user;
        } catch (error) {
            console.log(error);
        }
    };

    createUser = async (payload) => {
        try {
            const newUser = await User.create(payload);
            return newUser;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new UserService();
