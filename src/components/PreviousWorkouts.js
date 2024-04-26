import axios from 'axios'
import { useEffect, useState } from 'react'

function PreviousWorkouts(props) {

    const { currentUserWorkoutData, convertUTCDate } = props

    const [previousWorkoutEls, setPreviousWorkoutEls] = useState()
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
            const workoutsToShow = viewMoreDailyChallenges
                ? currentUserWorkoutData.workouts.reverse()
                : currentUserWorkoutData.workouts.reverse().slice(0, 5)
            
            const previousExerciseList = workoutsToShow.map((workout, index) => {
                return (
                    <div key={index} className='previous-workout-item-container'>
                        {formatDateForPreviousWorkout(workout.timeStamp)}
                        <div>day {currentUserWorkoutData.workouts.length - index}</div>
                        {Object.entries(workout).map(([exerciseName, reps], exerciseIndex) => {
                            if (exerciseName !== 'timeStamp') {
                                return (
                                    <div key={exerciseIndex}>{exerciseName}: {reps}</div>
                                )
                            }
                            return null
                        })}
                    </div>
                )
            })

            if (currentUserWorkoutData.workouts.length > 5) {
                previousExerciseList.push(
                    <button key="viewMoreChallengesButton" 
                        onClick={() => setViewMoreDailyChallenges(prevState => !prevState)}>{viewMoreDailyChallenges ? 'view less' : 'view more'}</button>
                )
            }

            setPreviousWorkoutEls(previousExerciseList)
        }
    }, [currentUserWorkoutData, viewMoreDailyChallenges])
    
    
    
    return (
        <div className="previous-workouts-container">
            <div className="previous-workouts-content">
                <div className='previous-workouts-title'>Previous Daily Challenges</div>
                {previousWorkoutEls}
                <div className='previous-challenges-view-more-toggle'>

                </div>
            </div>
            
        </div>
    )
}

export default PreviousWorkouts