import router from "express";
import * as eventController from '../controllers/eventController';

export const eventRouter = router();

// Get events list for given year
eventRouter.get('/:date', eventController.getEventsByYear);

// // Get number of events for each year
// eventRouter.get('/count', eventController.getEventsNumberByYears);