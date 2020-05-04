import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

export default mongoose.model('Photo', PhotoSchema);