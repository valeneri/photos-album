import router from "express";
import * as photoController from '../controllers/photoController';

export const photoRouter = router();

// Get all photos by year
photoRouter.get('/:date', photoController.getPhotosByYear);

// Get photos by event name (+date = eventTag)
photoRouter.get('/event/:name/:date', photoController.getPhotosByEventName);