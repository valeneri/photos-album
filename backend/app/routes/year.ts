import router from "express";
import * as yearController from '../controllers/yearController';

// Years router
export const yearRouter = router();

// Get all years
yearRouter.get('/', yearController.getAllYearsWithoutEvents);

// Get all years with events
yearRouter.get('/events', yearController.getAllYearsEvents);

// Post new year
yearRouter.post('/', yearController.createYear);

// Put new year
yearRouter.put('/:id', yearController.updateYear);