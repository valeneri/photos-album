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
export const createCategory = async (req: any, res: Response) => {
    console.log(req.body);
    console.log(req.file);
    const name = req.body.name;
    const label = req.body.label;

    console.log("category name :", name)
    if (name && label && req.file) {
        const icon = req.file;
        const newCategory = new Category({
            name: name,
            label: label,
            icon: {
                file: icon.buffer,
                filename: icon.originalname
            }
        });
        try {
            const categoryResponse = await newCategory.save();
            sendCreatedResponse(res, categoryResponse);
        } catch (err) {
            sendBadRequestErrorResponse(res, err);
        }
    } else {
        const err = new Error("No category found");
        sendNotFoundErrorResponse(res, err);
    }
}