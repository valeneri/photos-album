import express, { response, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { router as apiV1 } from "./routes/index";


const app = express();

/* mongo connection */
const mongoUrl = 'mongodb://randuser:randpw@mongo:27017/souvenirs-dev';

// Connect to MongoDB
const connecToMongo = async () => {
    let db = null;
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        console.log("connection to mongo opened");

        db = mongoose.connection;
        db.once('open', () => {
            console.log("connected to mongo!");
        })
    } catch (err) {
        (db) && db.close();
        db.on('error', console.error.bind(console, 'connection error:'));
        throw err;
    }
}

connecToMongo();
// open connection
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//     console.log("connected to mongo!");
// });

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

