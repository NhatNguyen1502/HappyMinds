import Video from '../models/Video.js';
import blog from '../models/Blog.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';

class HomepageService {
    index(req, res) {
        let isLogin = false;
        if (req.isAuthenticated()) {
            isLogin = true;
        }
        Video.find({})
            .then((videos) => {
                let blogs;
                blog.find({})
                    .then((blogsData) => {
                        blogs = multipleMongooesToOject(blogsData);
                        res.render('homepage', {
                            videos: multipleMongooesToOject(videos).slice(0, 3),
                            blogs,
                            isLogin,
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({ err: 'ERROR!' });
                    });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
    }

    showVideos(req, res) {
        const { height, weight } = req.body;
        const BMI = weight / ((height / 100) ** 2);
        const bmi = BMI.toFixed(2);
        let bmiType;
        
        if (bmi < 18.5) {
            bmiType = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiType = 'Healthy';
        } else if (bmi >= 25 && bmi < 30) {
            bmiType = 'Overweight';
        } else {
            bmiType = 'Obese';
        }
        Video.find({BMItype: bmiType})
            .then((videos) => {
                let blogs;
                blog.find({})
                    .then((blogsData) => {
                        blogs = multipleMongooesToOject(blogsData);
                        res.render('homepage', {
                            videos: multipleMongooesToOject(videos),
                            blogs,
                            bmiType,   
                            bmi,                         
                        });
                    })
                    .catch((err) => {
                        res.status(400).json({ err: 'ERROR!' });
                    });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
      };

      showAllVideos(req, res) {
        const arrayParam = req.body.array;
        const videos = JSON.parse(arrayParam);
        res.render('homepage',{videos})

        // Video.find({BMItype: bmiType})
        //     .then((videos) => {
        //         let blogs;
        //         blog.find({})
        //             .then((blogsData) => {
        //                 blogs = multipleMongooesToOject(blogsData);
        //                 res.render('homepage', {
        //                     videos: multipleMongooesToOject(videos),
        //                     blogs,
        //                     bmiType,  
        //                     bmi,                       
        //                 });
        //             })
        //             .catch((err) => {
        //                 res.status(400).json({ err: 'ERROR!' });
        //             });
        //     })
        //     .catch((err) => {
        //         res.status(400).json({ err: 'ERROR!' });
        //     });
      };
    
}

export default new HomepageService();
