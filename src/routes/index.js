import homepageRouter from './homepage.js';
import blogdetailRouter from './blogdetail.js';
import userRouter from './user.js';
import adminRouter from './admin.js';
import videoRouter from './video.js';
import foodcaloriesRouter from './foodcalories.js';
import blogRouter from './blog.js';
import videoCarouselRouter from './videoCarousel.js'

export function route(app) {
    app.use('/', homepageRouter);

    app.use('/homepage', homepageRouter);

    app.use('/bmicourse', videoCarouselRouter);

    app.use('/video', videoRouter);

    app.use('/food', foodcaloriesRouter);

    app.use('/blog', blogRouter);

    app.use('/admin', adminRouter);

    app.use('/blogdetail', blogdetailRouter);

    app.use('/user', userRouter);

    app.use('/blog', blogRouter);
}
