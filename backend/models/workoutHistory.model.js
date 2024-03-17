import mongoose from "mongoose"

const workoutHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workouts: [
        {
            exerciseName: {
                type: String,
                required: true
            },
            completionStatus: {
                type: Boolean,
                required: true
            }
        }
    ]
}, {
    timestamps: true,
})

const WorkoutHistory = mongoose.model('WorkoutHistory', workoutHistorySchema)

export default WorkoutHistory