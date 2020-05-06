import { Request, Response } from "express";
import Photo from "../models/photo";


// get all photos in a selected year
export const getPhotosByYear = async (req: Request, res: Response) => {
    try {
        const year = req.params['date'];
        const photos = await Photo.find({ path: { $regex: year } });
        res.status(200).json(photos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// get all photos in a selected event
export const getPhotosByEventName = async (req: Request, res: Response) => {
    try {
        const name = req.params['name'];
        const date = req.params['date']
        const eventTag = `${name}_${date}`;
        const photos = await Photo.find({ eventTag: eventTag });
        res.status(200).json(photos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
