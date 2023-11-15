import Video from '../models/Video.js';
import { multipleMongooesToOject } from '../../util/mongoose.js';
// import * as cheerio from 'cheerio';

class UserService {
    index(req, res) {
        Video.find({})
            .then((videos) => {
                res.render('user', {
                    videos: multipleMongooesToOject(videos),
                });
            })
            .catch((err) => {
                res.status(400).json({ err: 'ERROR!' });
            });
        // start();
    }

    createVideo = async (payload) => {
        try {
            console.log('user service', payload);
            const newVideo = await Video.insertMany(payload);
            return newVideo;
        } catch (error) {
            console.log(error);
        }
    };
}

// function start() {
//     const $ = cheerio.load(html);
//     let editBtn = $('#editBtn');
//     editBtn.addEventListener('click', handleEditBtnClick(editBtn));
// }

// function handleEditBtnClick(btn) {
//     console.log(btn.getAttribute('data-bs-whatever'));
// }

export default new UserService();
