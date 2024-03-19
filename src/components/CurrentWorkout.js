import { useState, useEffect } from "react"

function CurrentWorkout(props) {

    const [allExerciseEls, setAllExerciseEls] = useState([])

    const [formData, setFormData] = useState({
        pushups: 4,
        pullups: 4,
        plank: 4
    })

    const { currentUserWorkoutData } = props

    useEffect(() => {
        if (currentUserWorkoutData) {
            const currentExerciseList = currentUserWorkoutData.dailyRoutine.map((exercise,index) => {
               

                return (
                    <div key={index} className='routine-list-item'>
                        <div className='routine-exercise'>
                        {exercise.exerciseName}: <span className='exercise-quantity'>{exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1)} {exercise.unit}</span>
                        </div>
                        {/* <div className='routine-details'>{exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1)} {exercise.unit}</div> */}
                    </div>
                )
            })
            setAllExerciseEls(currentExerciseList)
        }
    }, [currentUserWorkoutData])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const currentTime = new Date()

        const finalWorkoutData = {
            timeStamp: currentTime,
            ...formData
        }

        console.log('running submit')

        fetch(`http://localhost:5000/workout-histories/update/${props.tempCurrentUserId}`, {
                method: "POST",
                body: JSON.stringify(finalWorkoutData), 
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                res.json()
                if (res.ok) {
                    console.log('successfully posted!')
                }
            })
            .then(data => console.log(data))
    }

    return (
        <main>
            <div className="workout-form-container">
                <div className="current-workout-title">Day {allExerciseEls.length > 0 && currentUserWorkoutData.workouts.length + 1}:</div>
                {allExerciseEls.length > 0 && allExerciseEls}
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="submit-btn" id="submit" >Submit Workout</button>
            </form>
        </main>
    )
}

export default CurrentWorkout