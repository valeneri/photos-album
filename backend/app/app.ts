import express, { NextFunction, Request, Response } from "express";
import { router as apiV1 } from "./routes/index";
import { connectToDb } from './db';

const app = express();

// connection to mongodb
connectToDb();

/**** express configuration ****/
app.set('port', process.env.port || 8080);

/**** middlewares  ****/
// json
app.use(express.json());
// Add headers
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});
app.use('/static', express.static('public'));
// router definition
app.use('/api', apiV1);

export default app;

