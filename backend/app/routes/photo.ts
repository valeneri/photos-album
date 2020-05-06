import router from "express";
import * as photoController from '../controllers/photoController';

export const photoRouter = router();

// Get all photos by year
photoRouter.get('/:date', photoController.getPhotosByYear);

// Get photos by eventTag (eventTag = title_date)
photoRouter.get('/event/:tag', photoController.getPhotosByEventTag);