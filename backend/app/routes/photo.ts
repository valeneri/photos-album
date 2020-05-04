import router from "express";
import * as photoController from '../controllers/photoController';

export const photoRouter = router();

// Get events list for given year
photoRouter.get('/:date', photoController.getPhotosByYear);