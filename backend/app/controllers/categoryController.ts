import { Request, Response } from "express";
import Category from '../models/category';
import { sendOKResponse, sendCreatedResponse, sendInternalServerErrorResponse, sendBadRequestErrorResponse, sendNotFoundErrorResponse } from './responseHandler';

// get all categories
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        sendOKResponse(res, categories);
    } catch (err) {
        sendInternalServerErrorResponse(res, err);
    }
}

// create a new category
export const createCategory = async (req: Request, res: Response) => {
    const category = req.body["category"];

    if (category) {
        const newCategory = new Category(category);
        try {
            const categoryResponse = newCategory.save();
            sendCreatedResponse(res, categoryResponse);
        } catch (err) {
            sendBadRequestErrorResponse(res, err);
        }
    } else {
        const err = new Error("No category found");
        sendNotFoundErrorResponse(res, err);
    }
}