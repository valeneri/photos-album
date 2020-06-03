
import { Request, Response } from "express";
import Year from '../models/year';
import { sendOKResponse, sendCreatedResponse, sendInternalServerErrorResponse, sendBadRequestErrorResponse } from './responseHandler';

// get all years including related events number, but without the events
export const getAllYearsWithoutEvents = async (req: Request, res: Response) => {
    try {
        const years = await Year.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "date",
                    foreignField: "date",
                    as: "events"
                },
            },
            {
                $project: {
                    _id: "$_id",
                    title: "$title",
                    date: "$date",
                    categoryGroup: "$categoryGroup",
                    eventsNumber: { $size: "$events" }
                },
            },
            { $sort: { date: -1 } }
        ]);
        sendOKResponse(res, years);
    } catch (err) {
        sendInternalServerErrorResponse(res, err);
    }
}

// get all years including related events 
export const getAllYearsEvents = async (req: Request, res: Response) => {
    try {
        const years = await Year.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "date",
                    foreignField: "date",
                    as: "events"
                }
            },
            { $sort: { date: -1 } }
        ]);
        sendOKResponse(res, years);
    } catch (err) {
        sendInternalServerErrorResponse(res, err);
    }
}

// create a new year in db
export const createYear = async (req: Request, res: Response) => {
    console.log(req.body.year)
    const year = new Year({
        title: `Année ${req.body.year.date}`,
        date: req.body.year.date,
        categoryGroup: [req.body.year.categoryGroup]
    });

    try {
        const newYear = await year.save()
        sendCreatedResponse(res, newYear);
    } catch (err) {
        sendBadRequestErrorResponse(res, err);
    }
};

