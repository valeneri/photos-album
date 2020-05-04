import mongoose from "mongoose";

const YearSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        default: "year"
    },
    date: {
        type: String,
        required: true
    },
    // isEvent: {
    //     type: Boolean,
    //     default: false
    // },
    selected: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Year', YearSchema);