import router from "express";
import * as eventController from '../controllers/eventController';
import event from "app/models/event";

export const eventRouter = router();

// Get events list for given year
eventRouter.get('/:date', eventController.getEventsByYear);

eventRouter.post('/', eventController.createEvent);
// // Get number of events for each year
// eventRouter.get('/count', eventController.getEventsNumberByYears);

// eventRouter.post('/photos', eventController.createEventWithPhotos);