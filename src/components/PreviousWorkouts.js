import axios from 'axios'
import { useEffect, useState } from 'react'

function PreviousWorkouts(props) {

    const [previousWorkoutEls, setPreviousWorkoutEls] = useState()

    const { currentUserWorkoutData, convertUTCDate } = props

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
            const previousExerciseList = currentUserWorkoutData.workouts.reverse().map((workout, index) => {
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
                        })}
                    </div>
                )
            })
            setPreviousWorkoutEls(previousExerciseList)
        }
    }, [currentUserWorkoutData])
    
    
    
    return (
        <div className="previous-workouts-container">
            <div className="previous-workouts-content">
              {previousWorkoutEls}
            </div>
            
        </div>
    )
}

export default PreviousWorkouts