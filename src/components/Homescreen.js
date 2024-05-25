import { useState, useEffect } from 'react'
import starShape from '../assets/yellow_burst_shape.svg'
import PreviousWorkouts from './PreviousWorkouts'
import { Link } from 'react-router-dom'

function Homescreen(props) {

    const { currentUserWorkoutData, convertUTCDate, userCompletedTodaysWorkout, retrieveData, userCanContinueChallenge } = props

    useEffect(() => {
        retrieveData()
    }, [])

    return (
        <main>
            <div className='homescreen-hero-container'>
                <div className='day-container'>
                    <div className='star-text-container'>
                        <p className='star-text-day'>Level</p>
                        <p className='star-text-day-number'>{
                            currentUserWorkoutData ? 
                            userCompletedTodaysWorkout ? currentUserWorkoutData.workouts.length : currentUserWorkoutData.workouts.length + 1 : 
                            ''
                        }</p>
                    </div>
                </div>
                <div className='current-streak-text'>current streak: {props.currentUserWorkoutData ? currentUserWorkoutData.workouts.length : ''} days</div>
                {userCompletedTodaysWorkout ? 
                <button className='start-workout-btn disabled-btn'>start today's challenge</button> :
                <Link to='/current-workout' className='no-underline'><button className='start-workout-btn'>start today's challenge</button></Link>}
                <Link to='/current-daily-challenge' className='no-underline'><button className='start-workout-btn'>{userCanContinueChallenge ? 'continue' : 'start'} today's challenge</button></Link>
                {userCompletedTodaysWorkout && 
                <div>
                    <div className='workout-completed-msg'>You completed your workout for the day!</div>
                    <div className='come-back-msg'>come back tomorrow to complete level {currentUserWorkoutData.workouts.length + 1}</div>
                </div>}
            </div>
            
            <PreviousWorkouts 
                tempCurrentUserId={props.tempCurrentUserId}
                currentUserData={props.currentUserData}
                currentUserWorkoutData={currentUserWorkoutData}
                convertUTCDate={convertUTCDate}
            />
            
        </main>
    )
}

export default Homescreen