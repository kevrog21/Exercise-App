import { useState, useEffect } from 'react'
import starShape from '../assets/yellow_burst_shape.svg'
import PreviousWorkouts from './PreviousWorkouts'
import { Link } from 'react-router-dom'

function Homescreen(props) {

    const { currentUserWorkoutData, convertUTCDate, userCompletedTodaysWorkout, retrieveData, mostRecentCompletedChallengeData, userCanContinueChallenge, setUserIsContinuingChallenge, userCompletedChallengeYesterday } = props
    const savedFormDataLocalStorage = localStorage.getItem('formData')


    useEffect(() => {
        retrieveData()
        localStorage.removeItem('selectedCategory')
        console.log('mostRecentCompletedChallengeData', mostRecentCompletedChallengeData)
    }, [])
    
    const handleContinueChallengeClick = () => {
        setUserIsContinuingChallenge(true)
    }

    return (
        <main>
            { currentUserWorkoutData && !currentUserWorkoutData.dailyRoutine.length > 0 ?
            <div className='new-user-message-container'>
                <div className='new-user-header'>Welcome Stranger!</div>
                <div className='new-user-message'>Let's get started by setting up a daily exercise routine.</div>
                <Link to='/daily-routine' className='new-user-set-routine-btn'>Set Daily Routine</Link>
            </div>
            :
            <div className='homescreen-hero-container page-margin-top'>
                <div className='day-container'>
                    <div className='star-text-container'>
                        <p className='star-text-day'>Level</p>
                        <p className='star-text-day-number'>{
                            Object.keys(mostRecentCompletedChallengeData).length > 0 ? mostRecentCompletedChallengeData.challengeNumber : '1'
                        }</p>
                    </div>
                </div>
                <div className='current-streak-text'>🔥{props.currentUserWorkoutData ? (userCompletedTodaysWorkout || userCompletedChallengeYesterday ? props.currentUserWorkoutData.currentChallengeStreak : '0') : '0'} {(Object.keys(mostRecentCompletedChallengeData).length > 0 ? mostRecentCompletedChallengeData.challengeNumber < 6 ? true : false : false) && 'day streak'}</div>
                {/* <div className='current-streak-text'>current streak: {props.currentUserWorkoutData ? (userCompletedTodaysWorkout || userCompletedChallengeYesterday ? props.currentUserWorkoutData.currentChallengeStreak : '0') : '0'} day{props.currentUserWorkoutData ? userCompletedTodaysWorkout && props.currentUserWorkoutData.currentChallengeStreak == 1 || userCompletedChallengeYesterday && props.currentUserWorkoutData.currentChallengeStreak == 1 ? '' : 's' : 's'}</div> */}
                


                {/* {userCompletedTodaysWorkout ? 
                <button className='start-workout-btn disabled-btn'>start today's challenge</button> :
                <Link to='/current-workout' className='no-underline'><button className='start-workout-btn'>start today's challenge</button></Link>
                } */}
                {userCanContinueChallenge ?
                    <Link to='/current-daily-challenge' className='no-underline'><button className='start-workout-btn' onClick={handleContinueChallengeClick}>continue today's challenge</button></Link> :
                    <Link to='/current-daily-challenge' className='no-underline'><button className='start-workout-btn'>{savedFormDataLocalStorage ? 'continue' : 'start'} today's challenge</button></Link>
                }
                <Link to='/current-daily-challenge' className='no-underline'><button className='start-workout-btn start-workout-txt'>start a workout</button></Link>
                
                {userCompletedTodaysWorkout && 
                <div>
                    <div className='workout-completed-msg'>You completed your workout for the day!</div>
                    {(Object.keys(mostRecentCompletedChallengeData).length > 0 ? mostRecentCompletedChallengeData.challengeNumber < 11 ? true : false : false) && <div className='come-back-msg'>come back tomorrow to complete level {mostRecentCompletedChallengeData.challengeNumber + 1}</div>}
                </div>}
            </div>
            }
            
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