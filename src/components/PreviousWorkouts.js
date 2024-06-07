import axios from 'axios'
import { useEffect, useState } from 'react'

function PreviousWorkouts(props) {

    const { currentUserWorkoutData, convertUTCDate } = props

    const [previousWorkoutEls, setPreviousWorkoutEls] = useState()
    const [previousChallengeEls, setPreviousChallengeEls] = useState()
    const [reversedCurrentUserWorkoutData, setReversedCurrentWorkoutData] = useState([])
    const [viewMoreDailyChallenges, setViewMoreDailyChallenges] = useState(false)
    const [viewMoreWorkouts, setViewMoreWorkouts] = useState(false)

    const formatDateForPreviousWorkout = (dateString) => {
        const date = new Date(dateString)

        const formattedDate = date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })

        return formattedDate
    }
    
    useEffect(() => {
        if (currentUserWorkoutData) {
            const reversedWorkoutData = currentUserWorkoutData.workouts.reverse()
            setReversedCurrentWorkoutData(reversedWorkoutData)
        }
    }, [currentUserWorkoutData])

    useEffect(() => {
        if (reversedCurrentUserWorkoutData.length > 0) {
            const dailyChallengesToShow = viewMoreDailyChallenges
                ? reversedCurrentUserWorkoutData
                : reversedCurrentUserWorkoutData.slice(0, 5)
            
            const previousChallengesList = dailyChallengesToShow.map((workout, index) => {
                return (
                    <div key={index} className='previous-workout-item-container'>
                        <div className='previous-workout-date'>{formatDateForPreviousWorkout(workout.timeStamp)}</div>
                        <div className='previous-workout-data-container'>
                            {Object.entries(workout).map(([exerciseName, reps], exerciseIndex) => {
                                if (exerciseName !== 'timeStamp' && exerciseName !== 'challengeComplete' && exerciseName !== 'challengeNumber') {
                                    if (workout[exerciseName].count >= 0) {
                                        return (
                                            <div key={exerciseIndex}><span className='bold'>{workout[exerciseName].count}</span> {exerciseName}</div>
                                        )
                                    } else {
                                        return (
                                            <div key={exerciseIndex}><span className='bold'>{reps}</span> {exerciseName}</div>
                                        )
                                    }
                                }
                                return null
                            })}
                            {workout.challengeComplete && <div>completed!</div>}
                        </div>
                    </div>
                )
            })

            if (reversedCurrentUserWorkoutData.length > 5) {
                previousChallengesList.push(
                    <div onClick={() => setViewMoreDailyChallenges(prevState => !prevState)}>
                        {viewMoreDailyChallenges && <div className='view-less-arrow'></div>}
                        <button className='view-more-challenges-button' key="viewMoreChallengesButton">{viewMoreDailyChallenges ? 'view less' : 'view more'}</button>
                        {!viewMoreDailyChallenges && <div className='view-more-arrow'></div>}
                    </div>
                )
            }

            setPreviousChallengeEls(previousChallengesList)
        }
    }, [reversedCurrentUserWorkoutData, viewMoreDailyChallenges])

    
    
    useEffect(() => {
        if (reversedCurrentUserWorkoutData.length > 0) {
            const workoutsToShow = viewMoreWorkouts
                ? reversedCurrentUserWorkoutData
                : reversedCurrentUserWorkoutData.slice(0, 5)
            
            const previousWorkoutList = workoutsToShow.map((workout, index) => {
                return (
                    <div key={index} className='previous-workout-item-container'>
                        <div className='previous-workout-date'>{formatDateForPreviousWorkout(workout.timeStamp)}</div>
                        <div className='previous-workout-data-container'>
                            {Object.entries(workout).map(([exerciseName, reps], exerciseIndex) => {
                                if (exerciseName !== 'timeStamp' && exerciseName !== 'challengeComplete') {
                                    if (workout[exerciseName].count) {
                                        return (
                                            <div key={exerciseIndex}><span className='bold'>{workout[exerciseName].count}</span> {exerciseName}</div>
                                        )
                                    } else {
                                        return (
                                            <div key={exerciseIndex}><span className='bold'>{reps}</span> {exerciseName}</div>
                                        )
                                    }
                                }
                                return null
                            })}
                        </div>
                    </div>
                )
            })

            if (reversedCurrentUserWorkoutData.length > 5) {
                previousWorkoutList.push(
                    <button className='view-more-challenges-button' key="viewMoreChallengesButton" 
                        onClick={() => setViewMoreWorkouts(prevState => !prevState)}>{viewMoreWorkouts ? 'view less' : 'view more'}</button>
                )
            }

            setPreviousWorkoutEls(previousWorkoutList)
        }
    }, [reversedCurrentUserWorkoutData, viewMoreWorkouts])
    
    return (
        <div>
            <div className="previous-workouts-container">
                <div className='previous-workouts-title'>Previous Daily Challenges</div>
                <div className="previous-workouts-content">
                    {previousChallengeEls}
                    <div className='previous-challenges-view-more-toggle'>
                    </div>
                </div>
            </div>
            <div className="previous-workouts-container">
                <div className='previous-workouts-title'>Previous Workouts</div>
                <div className="previous-workouts-content">
                    {}
                    <div className='previous-challenges-view-more-toggle'>

                    </div>
                </div>  
            </div>
        </div>
        
    )
}

export default PreviousWorkouts