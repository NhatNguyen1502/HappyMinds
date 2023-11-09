class UserController {
    index(req, res) {
        res.render('user')
    }
}

export default new UserController;