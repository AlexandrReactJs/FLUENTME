import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    userWordsList: {
        type: Array,
        default: [],
        required: false
    }
})


export default mongoose.model('User', UserSchema) 