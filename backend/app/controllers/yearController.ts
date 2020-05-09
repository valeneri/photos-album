
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
                    category: "$category",
                    selected: "$selected",
                    eventsNumber: { $size: "$events" }
                }
            }
        ]);
        sendOKResponse(res, years);
    } catch (err) {
        sendInternalServerErrorResponse(res, err);
    }
}

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


export const createYear = async (req: Request, res: Response) => {

    const year = new Year({
        title: `Année ${req.body.year.date}`,
        date: req.body.year.date,
    });

    try {
        const newYear = await year.save()
        sendCreatedResponse(res, newYear);
    } catch (err) {
        sendBadRequestErrorResponse(res, err);
    }
};

// export const getAllYearsWithEvents = async (req: Request, res: Response) => {
//     try {
//         const years = await Year.aggregate([
//             {
//                 $lookup: {
//                     from: "events",
//                     localField: "date",
//                     foreignField: "date",
//                     as: "events"
//                 }
//             }
//         ]);
//         res.status(200).json(years)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }
