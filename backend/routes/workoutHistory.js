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

const secretPassword = process.env.SECRET_PWORD

router.route('/:userId').get((req, res) => {
    const userId = req.params.userId
    WorkoutHistory.findOne({ userId: userId })
        .then(workoutList => res.json(workoutList))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/check-passwords').post((req, res) => {
    console.log("check password running", req.body.pword)
    const password = req.body.pword
    const honeyp = req.body.honeyp

    if (password === secretPassword && honeyp === '') {
        res.json({ valid: true })
    } else {
        res.json({ valid: false })
    }
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

router.route('/update-challenge/:userId/:workoutId').put((req, res) => {
    const userId = req.params.userId
    const workoutId = req.params.workoutId
    const updatedChallenge = req.body

    WorkoutHistory.findOneAndUpdate(
        {userId: userId, 'workouts._id': workoutId },
        {
            $set: {
                'workouts.$': updatedChallenge
            }
        },
        { new: true }
    )
    .then(workoutHistory => {
        if (!workoutHistory) {
            return res.status(404).json("Workout not found")
        }
        res.json('Wourkout updated successfully!')
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