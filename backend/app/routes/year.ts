import router from "express";
import * as yearController from '../controllers/yearController';

// Years router
export const yearRouter = router();

// Get all years
yearRouter.get('/', yearController.getAllYearsWithoutEvents);
// yearRouter.get('/', yearController.getAllYearsWithEvents);

// Get all years + associated events
yearRouter.get('/events', yearController.getAllYearsEvents);

yearRouter.post('/', yearController.createYear);