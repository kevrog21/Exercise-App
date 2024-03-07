import { Router } from "express"
import DailyWorkout from '../models/dailyworkout.model.js'


import cors from 'cors'
import express from "express"
import dotenv from 'dotenv'

dotenv.config()

const router = Router()

router.use(express.static("public"))
router.use(express.json())
router.use(cors())



const secretPassword = process.env.SECRET_PWORD

router.route('/').get((req, res) => {
    DailyWorkout.find()
        .then(dailyworkouts => res.json(dailyworkouts))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/').post((req, res) => {
    const username = req.body.username
    const description = req.body.description
    const date = Date.parse(req.body.date)

    const newWorkout = new DailyWorkout({
        username,
        description,
        date
    })

    newWorkout.save()
        .then(() => res.json('New Workout added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router