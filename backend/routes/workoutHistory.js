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

router.route('/:id').get((req, res) => {
    WorkoutHistory.findById(req.params.id)
        .then(workoutList => res.json(workoutList))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    WorkoutHistory.findById(req.params.id)
        .then(workoutHistory => {

            workoutHistory.workouts.push(req.body)

            workoutHistory.save()
                .then(() => res.json('Workout added to history!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})