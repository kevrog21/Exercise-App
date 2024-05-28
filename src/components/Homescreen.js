import { useState, useEffect } from 'react'
import starShape from '../assets/yellow_burst_shape.svg'
import PreviousWorkouts from './PreviousWorkouts'
import { Link } from 'react-router-dom'

function Homescreen(props) {

    const { currentUserWorkoutData, convertUTCDate, userCompletedTodaysWorkout, retrieveData, mostRecentCompletedChallengeData, userCanContinueChallenge, setUserIsContinuingChallenge, userCompletedChallengeYesterday } = props

    useEffect(() => {
        retrieveData()
        console.log('mostRecentCompletedChallengeData', mostRecentCompletedChallengeData)
    }, [])
    
    const handleContinueChallengeClick = () => {
        setUserIsContinuingChallenge(true)
    }


    return (
        <main>
            <div className='homescreen-hero-container'>
                <div className='day-container'>
                    <div className='star-text-container'>
                        <p className='star-text-day'>Level</p>
                        <p className='star-text-day-number'>{
                            Object.keys(mostRecentCompletedChallengeData).length > 0 ? mostRecentCompletedChallengeData.challengeNumber : '1'
                        }</p>
                    </div>
                </div>
                <div className='current-streak-text'>current streak: {props.currentUserWorkoutData ? (userCompletedTodaysWorkout || userCompletedChallengeYesterday ? props.currentUserWorkoutData.currentChallengeStreak : '0') : ''} day{props.currentUserWorkoutData ? props.currentUserWorkoutData.currentChallengeStreak == 1 ? '' : 's' : ''}</div>
                {userCompletedTodaysWorkout ? 
                <button className='start-workout-btn disabled-btn'>start today's challenge</button> :
                <Link to='/current-workout' className='no-underline'><button className='start-workout-btn'>start today's challenge</button></Link>
                }
                {userCanContinueChallenge ?
                    <Link to='/current-daily-challenge' className='no-underline'><button className='start-workout-btn' onClick={handleContinueChallengeClick}>continue today's challenge</button></Link> :
                    <Link to='/current-daily-challenge' className='no-underline'><button className='start-workout-btn'>start today's challenge</button></Link>
                }
                
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