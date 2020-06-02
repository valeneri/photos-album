import router from "express";
import * as categoryController from '../controllers/categoryController';

// category router
export const categoryRouter = router();

// get all categories
categoryRouter.get('/', categoryController.getAllCategories);

// post new category
categoryRouter.post('/', categoryController.createCategory);

