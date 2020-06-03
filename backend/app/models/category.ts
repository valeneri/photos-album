import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    icon: {
        type: {
            file: {
                type: Buffer,
                required: true
            },
            filename: {
                type: String,
                required: true
            }
        },
        required: true
    }
})

export default mongoose.model('Category', CategorySchema);