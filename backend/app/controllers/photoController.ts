import { Request, Response } from "express";
import fs from "fs-extra";
import Photo from "../models/photo";
import { sendOKResponse, sendCreatedResponse, sendNotFoundErrorResponse, sendInternalServerErrorResponse, sendBadRequestErrorResponse } from './responseHandler';
import sharp from 'sharp';

// get all photos in a selected year
export const getPhotosByYear = async (req: Request, res: Response) => {
    try {
        const year = req.params['date'];
        const photos = await Photo.find({ path: { $regex: year } });
        sendOKResponse(res, photos);
    } catch (err) {
        sendInternalServerErrorResponse(res, err);
    }
}

// get all photos in a selected event
export const getPhotosByEventTag = async (req: Request, res: Response) => {
    try {
        const eventTag = req.params['tag']
        const photos = await Photo.find({ eventTag: eventTag });
        sendOKResponse(res, photos);
    } catch (err) {
        sendNotFoundErrorResponse(res, err);
    }
}

export const savePhotosEvent = async (req: any, res: Response) => {
    const eventTag = req.body.eventTag;
    const date = req.body.date;
    const title = req.body.title;
    const pathPrefix = `${date}/${title}/`;
    const photoList = [];

    if (req.files) {
        try {
            req.files.forEach(photo => {
                const newPhoto = new Photo({
                    eventTag: eventTag,
                    name: photo.filename,
                    path: pathPrefix + photo.filename,
                    thumbnailPath: `${pathPrefix}thumbnails-${photo.filename}`,
                    dir: pathPrefix,
                    mimeType: photo.mimetype
                });
                photoList.push(newPhoto);
                generateThumbnails(photo, pathPrefix);
                moveFiles(photo.filename, pathPrefix);
            })
            const photos = await Photo.insertMany(photoList);
            sendCreatedResponse(res, photos);
        } catch (err) {
            sendInternalServerErrorResponse(res, err);
        }
    } else {
        const err = new Error("No photos found")
        sendNotFoundErrorResponse(res, err)
    }
}

const generateThumbnails = async (photo, pathPrefix) => {
    try {
        await sharp(photo.path).resize(150, 150)
            .png()
            .toFile(`${photo.destination}thumbnails-${photo.filename}`);
        await moveFiles(`thumbnails-${photo.filename}`, pathPrefix);
    } catch (err) {
        console.log('Error resizing photos', err);
        throw (err);
    }
}

const moveFiles = async (fileName: string, dir: string) => {
    try {
        await fs.move(`public/upload/${fileName}`, `public/photos/${dir}/${fileName}`);
    } catch (err) {
        console.log("ERROR moving files", err)
        throw (err);
    }
}
