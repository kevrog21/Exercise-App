import { useState, useEffect } from 'react'

function DailyRoutine(props) {

    const [exerciseEls, setExerciseEls] = useState()

    const { currentUserWorkoutData } = props

    useEffect(() => {
        if (currentUserWorkoutData) {
            const exerciseList = currentUserWorkoutData.dailyRoutine.map((exercise, index) => {
                return (
                    <div key={index} className='routine-list-item'>{exercise.exerciseName}</div>
                )
            })
            setExerciseEls(exerciseList)
        }
    }, [currentUserWorkoutData])

    const [formData, setFormData] = useState([
        {
            exerciseName: 'push-ups',
            dailyIncrement: 1,
            unit: 'reps'  
        },{
            exerciseName: 'sit-ups',
            dailyIncrement: 1,
            unit: 'reps'  
        },{
            exerciseName: 'leg lifts',
            dailyIncrement: 1,
            unit: 'reps'  
        },{
            exerciseName: 'leg kicks',
            dailyIncrement: 1,
            unit: 'reps'  
        },{
            exerciseName: 'plank',
            dailyIncrement: 1,
            unit: 'seconds'  
        },{
            exerciseName: 'pull ups',
            dailyIncrement: .5,
            unit: 'reps'  
        },{
            exerciseName: 'leg stretch',
            dailyIncrement: 1,
            unit: 'seconds'  
        }
    ])

    function submitDailyRoutineForm(e) {
        e.preventDefault()
        console.log('running submit!')

        fetch(`http://localhost:5000/workout-histories/update-routine/${props.tempCurrentUserId}`, {
                method: "POST",
                body: JSON.stringify(formData), 
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
            <div className="daily-routine-container">
                <div>Current Daily Routine:</div>
                
                    {currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 
                        <div className='routine-list-container'>${exerciseEls}</div> : 
                        <div className='no-routine-message'>you haven't set a routine yet</div>}
                
            </div>
            <form onSubmit={submitDailyRoutineForm}>
                <button type='submit' className='set-routine-btn'>{currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 'update' : 'set'} daily routine</button>
            </form>
        </main>
    )
}

export default DailyRoutine