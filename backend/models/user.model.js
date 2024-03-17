import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    email: {
        type: String, 
        required: true,
        unique: true
    }
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema)

export default User