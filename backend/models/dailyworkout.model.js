import mongoose from "mongoose"

const dailyWorkoutSchema = new mongoose.Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
})

const DailyWorkout = mongoose.model('DailyWorkout', dailyWorkoutSchema)

export default DailyWorkout