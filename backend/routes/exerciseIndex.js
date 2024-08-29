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
    console.log('trying to add now')
    try{
        const exerciseTitle = req.body.exerciseTitle
        const exerciseDescription = req.body.exerciseDescription
    
        const exercise = new ExerciseIndex({
            exerciseTitle,
            exerciseDescription
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

export default router