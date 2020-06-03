import { Request, Response } from "express";

const succeed = (status: number, data: any, res: Response) => {
    res.status(status).json(data);
}

const failed = (status: number, err: Error, res: Response) => {
    res.status(status).json({ message: err.message });
}



const sendOKResponse = (res: Response, data: any) => {
    succeed(200, data, res);
}

const sendCreatedResponse = (res: Response, data: any) => {
    succeed(201, data, res);
}

const sendNoContentResponse = (res: Response) => {
    succeed(204, null, res);
}

const sendBadRequestErrorResponse = (res: Response, err: Error) => {
    failed(400, err, res)
}

const sendInternalServerErrorResponse = (res: Response, err: Error) => {
    failed(500, err, res)
}

const sendNotFoundErrorResponse = (res: Response, err: Error) => {
    failed(404, err, res);
}

export { sendOKResponse, sendCreatedResponse, sendNoContentResponse, sendInternalServerErrorResponse, sendBadRequestErrorResponse, sendNotFoundErrorResponse }