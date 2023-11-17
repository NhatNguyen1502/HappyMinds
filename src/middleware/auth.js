// if user is authenticated the redirected to next page else redirect to login page
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/user');
    }
}
// if user is authenticated and going to login page then redirected to home page if not authenticated redirected to login page  .
function ensureGuest(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

export { ensureAuth, ensureGuest };
