import express from 'express';
<<<<<<< HEAD
import videoController from '../resources/app/controllers/videoController.js';

const router = express.Router();

router.get('/', videoController.showVideo);


=======
import videoController from '../app/controllers/VideoController.js';

const router = express.Router();

router.get('/:id', videoController.show);
>>>>>>> develop

export default router;
