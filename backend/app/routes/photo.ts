import router from "express";
import * as photoController from '../controllers/photoController';
import path from 'path';
import multer from "multer";

const storage = multer.diskStorage({
    destination: 'public/upload/', // uploading directory 
    filename: function (req, file, cb) { //cahnge file name
        let ext = (path.extname(file.originalname)).toLowerCase(); //get file extension
        let time = Date.now(); //get timestamp
        cb(null, 'photo-' + time + ext); //return renamed file
    }
})

const upload = multer({ storage: storage })


export const photoRouter = router();

// Get all photos by year
photoRouter.get('/:date', photoController.getPhotosByYear);

// Get photos by eventTag (eventTag = title_date)
photoRouter.get('/events/:tag', photoController.getPhotosByEventTag);

// save photos in event
photoRouter.post('/events', upload.array('photos'), photoController.savePhotosEvent);

