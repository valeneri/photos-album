import express, { response, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { router as apiV1 } from "./routes/index";
import { request } from "http";

const app = express();

/* mongo connection */
const mongoUrl = 'mongodb://randuser:randpw@mongo:27017/souvenirs-dev';

// Connect to MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
    console.log("connection to mongo opened");
}).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

// open connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("connected to mongo!");
});

/**** express configuration ****/
app.set('port', process.env.port || 8080);

/**** middlewares  ****/
// json
app.use(express.json());
// Add headers
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use('/static', express.static('public'));
// router definition
app.use('/api', apiV1);

export default app;

