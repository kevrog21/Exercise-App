import axios from 'axios'
import { useEffect, useState } from 'react'

function PreviousWorkouts(props) {

    const { currentUserWorkoutData, convertUTCDate } = props

    const [previousWorkoutEls, setPreviousWorkoutEls] = useState()
    const [reversedCurrentUserWorkoutData, setReversedCurrentWorkoutData] = useState([])
    const [viewMoreDailyChallenges, setViewMoreDailyChallenges] = useState(false)

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
            const workoutsToShow = viewMoreDailyChallenges
                ? reversedCurrentUserWorkoutData
                : reversedCurrentUserWorkoutData.slice(0, 5)
            
            const previousExerciseList = workoutsToShow.map((workout, index) => {
                return (
                    <div key={index} className='previous-workout-item-container'>
                        <div className='previous-workout-date'>{formatDateForPreviousWorkout(workout.timeStamp)}</div>
                        {Object.entries(workout).map(([exerciseName, reps], exerciseIndex) => {
                            if (exerciseName !== 'timeStamp') {
                                return (
                                    <div key={exerciseIndex}><span className='bold'>{reps}</span> {exerciseName}</div>
                                )
                            }
                            return null
                        })}
                    </div>
                )
            })

            if (reversedCurrentUserWorkoutData.length > 5) {
                previousExerciseList.push(
                    <button key="viewMoreChallengesButton" 
                        onClick={() => setViewMoreDailyChallenges(prevState => !prevState)}>{viewMoreDailyChallenges ? 'view less' : 'view more'}</button>
                )
            }

            setPreviousWorkoutEls(previousExerciseList)
        }
    }, [reversedCurrentUserWorkoutData, viewMoreDailyChallenges])
    
    
    
    return (
        <div className="previous-workouts-container">
            <div className='previous-workouts-title'>Previous Daily Challenges</div>
            <div className="previous-workouts-content">
                {previousWorkoutEls}
                <div className='previous-challenges-view-more-toggle'>

                </div>
            </div>
            
        </div>
    )
}

export default PreviousWorkouts