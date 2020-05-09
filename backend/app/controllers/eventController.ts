import { Request, Response } from "express";
import Event from '../models/event';
import { sendOKResponse, sendCreatedResponse, sendInternalServerErrorResponse, sendBadRequestErrorResponse, sendNotFoundErrorResponse } from './responseHandler';


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
        sendOKResponse(res, events);
    } catch (err) {
        sendInternalServerErrorResponse(res, err);
    }
}

export const createEvent = async (req: Request, res: Response) => {

    const newEvent = req.body.event;

    if (newEvent) {
        // const eventTag = `${newEvent.title}_${newEvent.full_date}`;
        const event = new Event({
            title: newEvent.title,
            full_date: newEvent.full_date,
            date: newEvent.date,
            location: newEvent.location,
            description: newEvent.description,
            category: newEvent.category,
            eventTag: newEvent.eventTag
        })
        try {
            const createdEvent = await event.save();
            sendCreatedResponse(res, createdEvent);
        } catch (err) {
            sendBadRequestErrorResponse(res, err);
        }
    } else {
        const err = new Error("No event found");
        sendNotFoundErrorResponse(res, err);
    }
}

// export const createEventWithPhotos = async (req: Request, res: Response) => {



//     if (newEvent) {
//         const eventTag = `${newEvent.title}_${newEvent.full_date}`
//         const event = new Event({
//             title: newEvent.title,
//             full_date: newEvent.full_date,
//             date: newEvent.date,
//             location: newEvent.location,
//             description: newEvent.description,
//             category: newEvent.category,
//             eventTag: eventTag
//         })
//         try {
//             const responsePhotos = await Photo.insertMany(photoList);
//             const responseEvent = await event.save();
//             res.status(201).json({ event: responseEvent, photos: responsePhotos });
//         } catch (err) {
//             res.status(400).json({ message: err.message })
//         }
//     }
// }
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
