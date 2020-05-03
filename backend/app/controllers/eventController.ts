import { Request, Response } from "express";
import Event from '../models/event';


// get events by year
export const getEventsByYear = async (req: Request, res: Response) => {
    try {
        const year = req.params['date'];
        const events = await Event.find({ date: { $regex: year } });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}