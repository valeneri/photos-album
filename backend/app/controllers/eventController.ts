import { Request, Response } from "express";
import Event from '../models/event';


// get events by year with associated photos number, but without photos
export const getEventsByYear = async (req: Request, res: Response) => {
    try {
        const year = req.params['date'];
        const events = await Event.aggregate([
            {
                $match: { date: `${year}` }
            },
            {
                $lookup: {
                    from: "photos",
                    localField: "eventTag",
                    foreignField: "eventTag",
                    as: "photos"
                }
            },
            {
                $project: {
                    _id: "$_id",
                    title: "$title",
                    date: "$date",
                    category: "$category",
                    selected: "$selected",
                    location: "$location",
                    full_date: "$full_date",
                    photosNumber: { $size: "$photos" }
                }
            }
        ]);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// export const getEventsByYearWithPhotos = async (req: Request, res: Response) => {
//     try {
//         const year = req.params['date'];
//         const events = await Event.aggregate([
//             {
//                 $match: { date: `${year}` }
//             },
//             {
//                 $lookup: {
//                     from: "photos",
//                     localField: "eventTag",
//                     foreignField: "eventTag",
//                     as: "photos"
//                 }
//             }
//         ]);
//         res.status(200).json(events);
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// }
