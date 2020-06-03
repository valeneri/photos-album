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
        type: {
            name: {
                type: String,
                required: true,
            },
            label: {
                type: String,
                required: true,
            }
        },
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    full_date: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    eventTag: {
        type: String,
        required: true
    }
})

export default mongoose.model('Event', EventSchema);