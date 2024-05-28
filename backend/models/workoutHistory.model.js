import mongoose from "mongoose"

const workoutHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    dailyRoutine: [

    ],
    workouts: [
        
    ],
    currentChallengeStreak: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
})

const WorkoutHistory = mongoose.model('WorkoutHistory', workoutHistorySchema)

export default WorkoutHistory