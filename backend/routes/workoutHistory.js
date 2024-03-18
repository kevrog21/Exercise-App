import { Router } from "express"
import WorkoutHistory from '../models/workoutHistory.model.js'


import cors from 'cors'
import express from "express"
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(express.static("public"))
router.use(express.json())
router.use(cors())

router.route('/:userId').get((req, res) => {
    const userId = req.params.userId
    WorkoutHistory.findOne({ userId: userId })
        .then(workoutList => res.json(workoutList))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:userId').post((req, res) => {
    const userId = req.params.userId
    WorkoutHistory.findOne({ userId: userId })
        .then(workoutHistory => {
            if (!workoutHistory) {
                return res.status(404).json('Workout history not found for user')
            } 

            workoutHistory.workouts.push(req.body)

            workoutHistory.save()
                .then(() => res.json('Workout added to history!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update-routine/:userId').post((req, res) => {
    const userId = req.params.userId
    WorkoutHistory.findOne({ userId: userId })
        .then(workoutHistory => {
            if (!workoutHistory) {
                return res.status(404).json('Workout history not found for user')
            }

            workoutHistory.dailyRoutine = req.body

            workoutHistory.save()
                .then(() => res.json('Routine Saved!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router