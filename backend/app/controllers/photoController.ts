import { Request, Response } from "express";
import Photo from "../models/photo";



export const getPhotosByYear = async (req: Request, res: Response) => {
    try {
        const year = req.params['date'];
        const photos = await Photo.find({ path: { $regex: year } });
        res.status(200).json(photos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
