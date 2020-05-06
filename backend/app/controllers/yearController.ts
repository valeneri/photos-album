
import { Request, Response } from "express";
import Year from '../models/year';

// get all years without the events
export const getAllYearsWithoutEvents = async (req: Request, res: Response) => {
    try {
        const years = await Year.find();
        res.status(200).json(years)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// define the about route
export const getAllYearsEvents = (req: Request, res: Response) => {
    res.send('GET ALL EVENTS YEARS');
}

export const createYear = async (req: Request, res: Response) => {
    // const year = {title: "Année 2019",}
    console.log(req.body);

    const year = new Year({
        title: req.body.year.title,
        date: req.body.year.date,
    });

    try {
        const newYear = await year.save()
        res.status(201).json(newYear);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};

export const getAllYearsWithEvents = async (req: Request, res: Response) => {
    try {
        const years = await Year.aggregate([
            {
                $lookup: {
                    from: "events",
                    localField: "date",
                    foreignField: "date",
                    as: "events"
                }
            }
        ]);
        res.status(200).json(years)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}