import router from "express";
import * as yearController from '../controllers/yearController';

// Years router
export const yearRouter = router();

// Get all years
yearRouter.get('/', yearController.getAllYearsWithoutEvents);

// yearRouter.post('/', yearController.createYear);