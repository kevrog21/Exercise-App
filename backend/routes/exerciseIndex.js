import { Router } from "express"
import ExerciseIndex from '../models/exerciseIndex.model.js'
import cors from 'cors'
import express from "express"
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(express.static("public"))
router.use(express.json())
router.use(cors())

router.route('/add').post(async (req, res) => {
    try{
        const exerciseTitle = req.body.exerciseTitle
        const exerciseCategory = req.body.exerciseCategory
        const workoutType = req.body.workoutType
        const exerciseDescription = req.body.exerciseDescription
        const exerciseTips = req.body.exerciseTips
    
        const exercise = new ExerciseIndex({
            exerciseTitle,
            exerciseCategory,
            workoutType,
            exerciseDescription,
            exerciseTips
        })
    
        await exercise.save()

        res.status(201).json({message: 'Exercise created successfully'})
    } catch (error) {
        console.error('Error adding exercise: ', error)
        res.status(500).json({ error: 'Internal server' })
    }
})

router.route('/').get((req, res) => {
    ExerciseIndex.find()
        .then(index => res.json(index))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    ExerciseIndex.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    ExerciseIndex.findByIdAndDelete(req.params.id)
        .then(res.json('Exercise Deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router