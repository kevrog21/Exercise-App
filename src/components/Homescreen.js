import { useState, useEffect } from 'react'
import starShape from '../assets/yellow_burst_shape.svg'
import PreviousWorkouts from './PreviousWorkouts'
import { Link } from 'react-router-dom'

function Homescreen(props) {

    const [mostRecentWorkoutDate, setMostRecentWorkoutDate] = useState()
    const [userCompletedTodaysWorkout, setUserCompletedTodaysWorkout] = useState(false)

    const { currentUserWorkoutData, convertUTCDate } = props

    useEffect(() => {
        if (currentUserWorkoutData && currentUserWorkoutData.workouts.length > 0) {
            setMostRecentWorkoutDate(currentUserWorkoutData.workouts[currentUserWorkoutData.workouts.length - 1].timeStamp)
        }
    }, [currentUserWorkoutData])

    useEffect(() => {
        const latestWorkoutDate = new Date(mostRecentWorkoutDate)

        const currentDate = new Date()
        const currentDayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

        const isWithinCurrentDay = latestWorkoutDate >= currentDayStart && latestWorkoutDate < currentDate

        if (isWithinCurrentDay) {
            console.log('is within the current day')
            setUserCompletedTodaysWorkout(true)
        } else {
            console.log('is not within the current day')
        }
    }, [mostRecentWorkoutDate])

    return (
        <main>
            <div className='homescreen-hero-container'>
                <div className='day-container'>
                    <div className='star-text-container'>
                        <p className='star-text-day'>Day</p>
                        <p className='star-text-day-number'>{props.currentUserWorkoutData ? props.currentUserWorkoutData.workouts.length + 1 : ''}</p>
                    </div>
                </div>
                <div className='current-streak-text'>current streak: {props.currentUserWorkoutData ? props.currentUserWorkoutData.workouts.length : ''} days</div>
                {userCompletedTodaysWorkout ? 
                <button className='start-workout-btn disabled-btn'>start today's workout</button> :
                <Link to='/current-workout'><button className='start-workout-btn'>start today's workout</button></Link>}
                
                {userCompletedTodaysWorkout && <div className='workouy-completed-msg'>You completed your workout for the day!</div>}
            </div>
            
            <PreviousWorkouts 
                tempCurrentUserId={props.tempCurrentUserId}
                currentUserData={props.currentUserData}
                currentUserWorkoutData={props.currentUserWorkoutData}
                convertUTCDate={convertUTCDate}
            />
            
        </main>
    )
}

export default Homescreen