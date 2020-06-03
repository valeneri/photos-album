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
                    eventTag: "$eventTag",
                    description: "$description",
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

    const event = req.body.event;

    if (event) {
        // const eventTag = `${newEvent.title}_${newEvent.full_date}`;
        console.log(event)
        console.log(event.category);
        const newEvent = new Event({
            title: event.title,
            full_date: event.full_date,
            date: event.date,
            location: event.location,
            description: event.description,
            category: event.category,
            eventTag: event.eventTag
        })
        try {
            const createdEvent = await newEvent.save();
            sendCreatedResponse(res, createdEvent);
        } catch (err) {
            sendBadRequestErrorResponse(res, err);
        }
    } else {
        const err = new Error("No event found");
        sendNotFoundErrorResponse(res, err);
    }
}

