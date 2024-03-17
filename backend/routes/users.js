import { Router } from "express"
import User from '../models/user.model.js'
import createWorkoutHistoryForUser from './userWorkoutHistory.js'


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
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post(async (req, res) => {
    try{
        const username = req.body.username
        const email = req.body.email
    
        const newUser = new User({
            username,
            email
        })
    
        await newUser.save()

        await createWorkoutHistoryForUser(newUser._id)

        res.status(201).json({message: 'User created successfully'})
    } catch (error) {
        console.error('Error adding user: ', error)
        res.status(500).json({ error: 'Internal server' })
    }
})

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router