import axios from 'axios'
import { useEffect, useState } from 'react'

function PreviousWorkouts(props) {

    const [previousWorkoutEls, setPreviousWorkoutEls] = useState()

    const { currentUserWorkoutData, convertUTCDate } = props

    useEffect(() => {
        if (currentUserWorkoutData) {
            const previousExerciseList = currentUserWorkoutData.workouts.reverse().map((workout, index) => {
                return (
                    <div key={index} className='previous-workout-item-container'>
                        {convertUTCDate(workout.timeStamp)}
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