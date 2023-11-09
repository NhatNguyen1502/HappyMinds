import homepageRouter from "./homepage.js"
import userRouter from "./user.js"


export function route(app) {
    app.use('/homepage', homepageRouter);
    // app.get('/homepage', (req, res) => {res.render('homepage');});      
    
    app.use('/user', userRouter);
}
