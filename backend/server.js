import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dailyWorkoutRouter from './routes/dailyworkouts.js'
import usersRouter from './routes/users.js'
import workoutHistoriesRouter from './routes/workoutHistory.js'
import exerciseIndexRouter from './routes/exerciseIndex.js'
import { fileURLToPath } from 'url'

const app = express()

import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const buildPath = path.resolve(__dirname, '../build')

app.use(express.static(buildPath))

dotenv.config()



app.use(cors({
    origin: 'https://dailyfitchallenge.com',
    credentials: true,
}))
app.use(express.json())

// app.use(cors({
//     origin: 'https://dailyfitchallenge.com',
//     credentials: true,
// }))
// app.use(express.json())


//delete this after uncommenting above code
// app.use(cors())

 const uri = process.env.ATLAS_URI
 mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

 const connection = mongoose.connection
 connection.once('open', () => {
     console.log('MongoDB exercise database connection established succesfully!')
 })

app.use('/daily-workouts', dailyWorkoutRouter)
app.use('/users', usersRouter)
app.use('/workout-histories', workoutHistoriesRouter)
app.use('/exercise-index', exerciseIndexRouter)

app.get("/*", function(req, res) {
    res.sendFile(
        path.join(buildPath, "index.html"),
        function (err) {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            }
        }
    )
})

app.use('*', (req, res) => res.status(404).json({error: "not found"}))

export default app