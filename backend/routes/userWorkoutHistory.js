import express from "express"
import { Router } from "express"
import WorkoutHistory from '../models/workoutHistory.model.js'

async function createWorkoutHistoryForUser(userId) {
    try {
        const currentTime = new Date()

        const workoutHistory = new WorkoutHistory({
            userId: userId,
            dailyRoutine: [],
            goals: [],
            workouts: []
        })

        await workoutHistory.save()
        console.log('Workout history document created for user: ', userId)
    } catch (error) {
        console.error('Error creating workout history: ', error)
    }
}

export default createWorkoutHistoryForUser
