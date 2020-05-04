import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    selected: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Event', EventSchema);