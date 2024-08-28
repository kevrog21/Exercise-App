import mongoose from "mongoose"

const exerciseIndexSchema = new mongoose.Schema({
    exerciseTitle: {
        type: String, 
    },
    exerciseDescription: {
        type: String, 
    }
}, {
    timestamps: true,
})

const ExerciseIndex = mongoose.model('ExerciseIndex', exerciseIndexSchema)

export default ExerciseIndex