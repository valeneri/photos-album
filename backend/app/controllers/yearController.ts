
import { Request, Response } from "express";
import Year from '../models/year';
import { sendOKResponse, sendCreatedResponse, sendNoContentResponse, sendInternalServerErrorResponse, sendBadRequestErrorResponse, sendNotFoundErrorResponse } from './responseHandler';

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
    const year = new Year({
        title: `Année ${req.body.year.date}`,
        date: req.body.year.date,
        categoryGroup: req.body.year.categoryGroup
    });

    try {
        const newYear = await year.save()
        sendCreatedResponse(res, newYear);
    } catch (err) {
        sendBadRequestErrorResponse(res, err);
    }
};


export const updateYear = async (req: Request, res: Response) => {
    const id = req.params['id'];
    const year = req.body.year;
    if (year && id) {
        try {
            await Year.updateOne({ _id: id }, {
                categoryGroup: year.categoryGroup
            })
            sendNoContentResponse(res);
        } catch (err) {
            sendInternalServerErrorResponse(res, err);
        }
    } else {
        const err = new Error('Year is not found');
        sendNotFoundErrorResponse(res, err);
    }
}
