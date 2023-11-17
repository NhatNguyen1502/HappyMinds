import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/login', (req, res) => {
    // if (req.user) {
    // 	res.redirect("/profile");
    // }
    res.render('loginpage');
});

router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    console.log('User authenticated:', req.user);
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    if (req.isAuthenticated()) {
        // Nếu đăng nhập, thực hiện đăng xuất
        req.logout();
        // Hủy bỏ session
        req.session.destroy((err) => {
            if (err) {
                console.log('Error destroying session: ', err);
            }
            // Chuyển hướng về trang chủ hoặc trang đăng nhập (tuỳ thuộc vào yêu cầu)
            res.redirect('/');
        });
    } else {
        // Nếu người dùng chưa đăng nhập, bạn có thể xử lý theo cách khác tùy thuộc vào yêu cầu của bạn
        res.redirect('/');
    }
});

export default router;
