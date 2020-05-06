import router from "express";
import * as eventController from '../controllers/eventController';

export const eventRouter = router();

// Get events list for given year
eventRouter.get('/:date', eventController.getEventsByYearWithPhotos);