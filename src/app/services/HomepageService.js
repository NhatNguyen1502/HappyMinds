import Video from '../models/Video.js';
import blog from '../models/Blog.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class HomepageService {
    index(req, res) {
        Video.find({})
            .then((video) => {
                let blogs;
                blog.find({})
                    .then((blogsData) => {
                        blogs = multipleMongooesToOject(blogsData);
                        // res.render('hompage', { blogs });
                        res.render('homepage', {
                            video: multipleMongooesToOject(video).slice(0, 3),
                            blogs,
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({ err: 'ERROR!' });
                    });
                // console.log(blogs,"11");
                // res.render('homepage', {
                //     videos: multipleMongooesToOject(videos).slice(0, 3),
                //     blogs,
                // });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }
    checkBMI(req, res) {
        let height = req.body.height / 100;
        let weight = req.body.weight;
        let BMI = weight / (height * height);

        res.send(`BMI: ${BMI}`);
    }

    showVideos(req, res) {
        const BMItype = req.params.BMItype;
        console.log(BMItype);
        Video.find({ BMItype: BMItype }).then((videos) => {
            res.render('homepage', {
                videos: multipleMongooesToOject(videos),
            });
        });
    }
}

export default new HomepageService();
