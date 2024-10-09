import mongoose from "mongoose"

const exerciseIndexSchema = new mongoose.Schema({
    exerciseTitle: {
        type: String, 
        required: true,
        unique: true,
    },
    exerciseCategory: {
        type: String,
        required: true,
    },
    workoutType: {
        type: String,
        required: true,
    },
    exerciseDescription: {
        type: String, 
        required: false,
    },
    exerciseRating: { 
        type: Number, 
        required: false,
    }
}, {
    timestamps: true,
})

const ExerciseIndex = mongoose.model('ExerciseIndex', exerciseIndexSchema)

export default ExerciseIndex