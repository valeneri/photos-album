import mongoose from "mongoose";

/* mongo connection */
const mongoUrl = 'mongodb://randuser:randpw@mongo:27017/souvenirs-dev';

// Connect to MongoDB

export const connectToDb = async () => {
    let db = null;
    try {
        await mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        console.log("connection to mongo opened");
        db = mongoose.connection;
    } catch (err) {
        (db) && db.close();
        db.on('error', console.error.bind(console, 'connection error:'));
        throw err;
    }
}
