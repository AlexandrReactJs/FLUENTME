import mongoose from "mongoose";


export const WordsCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    engName: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    }

})



export default mongoose.model('WordsCategorySchema', WordsCategory)