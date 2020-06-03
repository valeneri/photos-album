import router from "express";
import * as categoryController from '../controllers/categoryController';
import multer from "multer";

const upload = multer();
// category router
export const categoryRouter = router();

// get all categories
categoryRouter.get('/', categoryController.getAllCategories);

// post new category
categoryRouter.post('/', upload.single('category'), categoryController.createCategory);

