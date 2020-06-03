import mongoose from "mongoose";

const YearSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categoryGroup: {
        type: [{
            category: {
                label: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
            },
            value: {
                type: Number,
                required: true
            }
        }],
        required: true,
    },
    date: {
        type: String,
        required: true
    }
})

export default mongoose.model('Year', YearSchema);