import mongoose from "mongoose";


const WordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    translate: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    usageExample: {
        type: String,
        required: true
    }
}, {timestamps: true})


export default mongoose.model('WordSchema', WordSchema)