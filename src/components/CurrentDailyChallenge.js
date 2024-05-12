import { useState, useEffect } from "react"
import { useNavigateToLink } from './ToHomeScreen'
import Timer from "./Timer"

export default function CurrentDailyChallenge(props) {
    const navigate = useNavigateToLink()
    const [allExerciseEls, setAllExerciseEls] = useState([])
    const [checkboxes, setCheckboxes] = useState({})
    
    const { currentUserWorkoutData, userCompletedTodaysWorkout } = props

    const [formData, setFormData] = useState({honeyp: '', pword: ''})
    const [challengeComplete, setChallengeComplete] = useState(false)

    const [showTimer, setShowTimer] = useState(false)
    const [timerTime, setTimerTime] = useState(0)

    useEffect(() => {
        if (currentUserWorkoutData) {
            const initialFormData = currentUserWorkoutData.dailyRoutine.reduce((acc, exercise, index) => {
                return { 
                    ...acc, 
                    [exercise.exerciseName]: {
                        count: 0, 
                        goalReps: exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1), 
                        isComplete: false}
                    }
            }, {honeyp: '', pword: ''})
            setFormData(initialFormData)
        }
    }, [currentUserWorkoutData])

    const handleIncrement = (exerciseName) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [exerciseName]: {
                ...prevFormData[exerciseName],
                count: prevFormData[exerciseName].count + 1,
                isComplete: prevFormData[exerciseName].count + 1 >= prevFormData[exerciseName].goalReps
            }
        }))
    }

    const handleDecrement = (exerciseName) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [exerciseName]: {
                ...prevFormData[exerciseName],
                count: prevFormData[exerciseName].count > 0 ? prevFormData[exerciseName].count - 1 : 0,
                isComplete: prevFormData[exerciseName].count - 1 >= prevFormData[exerciseName].goalReps
            }
        }))
    }

    const checkCompletionStatus = (objectToCheck) => {
        const itemsWithIsCompleteKey = Object.keys(objectToCheck)
        .filter(key => objectToCheck[key].hasOwnProperty('isComplete'))
        .map(key => objectToCheck[key].isComplete)

        if (itemsWithIsCompleteKey.length > 0 && itemsWithIsCompleteKey.every(isComplete => isComplete)) {
            setChallengeComplete(true)
            console.log('complete!!!')
        } else {
            console.log('you have not completed the challnge yet', itemsWithIsCompleteKey)
            setChallengeComplete(false)
        }
    }

    useEffect(() => {
        if (currentUserWorkoutData && Object.keys(formData).length > 2) {
            const dailyChallengeExercises = currentUserWorkoutData.dailyRoutine.map((exercise, index) => {
                return (
                    <div key={index} className='current-workout-list-item'>
                        <div className='exercise-timer-container'>
                            <div className={`exercise ${formData[exercise.exerciseName].count >= exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1) ? 'completed-exercise' : ''}`}>
                                <div className='exercise-label'>{exercise.exerciseName}:
                                    <span className='required-rep-label'>{Math.ceil(exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1))} {exercise.unit}</span>
                                </div>
                                <div className='exercise-label-right-side'>
                                    {formData[exercise.exerciseName].count >= exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1) && <div className='exercise-completed-check'>✓</div>}
                                    <div className='rep-scroller-container'>
                                        <div className='current-rep-label'>current</div>
                                        <div className='rep-scroller'>
                                            <div className='current-rep'>{formData[exercise.exerciseName].count}</div>
                                            <div className='temp-button-container'>
                                                <div className='temp-button' onClick={() => handleDecrement(exercise.exerciseName)}>-</div>
                                                <div className='temp-button' onClick={() => handleIncrement(exercise.exerciseName)}>+</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {exercise.unit === 'seconds' && 
                            <div className='timer-background'>
                                <div className='timer-icon-container'>
                                    <div className='timer-icon'
                                    onClick={() => {
                                        console.log('clicked')
                                        setTimerTime(Math.ceil(exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1)))
                                        setShowTimer(true)
                                    }} >
                                        <div className="timer-top"></div>
                                        <div className="timer-stem"></div>
                                        <div className="timer-circle">
                                            <div className='timer-icon-text'>{Math.ceil(exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1))}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                )
            })
            setAllExerciseEls(dailyChallengeExercises)
            checkCompletionStatus(formData)
        }
    }, [currentUserWorkoutData, formData])

    const handleFormChange = (event) => {
        const { name, value } = event.target
        const newValue = parseInt(value)

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const incompleteMessageEl = document.getElementById('incomplete-workout-message')
        const successMessageEl = document.getElementById('success-message')
        const incorrectPasswordEl = document.getElementById('incorrect-password-message')
        const alreadyCompletedWorkoutEl = document.getElementById('already-completed-message')
        console.log(formData)

        if (formData.honeyp === '' && challengeComplete) {
            //send to database

            //if all of the formData items are complete, increase the current streak value in the database
        }
    }

    return (
        <main className="page-margin-top">
            {showTimer && 
                <Timer 
                    showTimer={showTimer}
                    setShowTimer={setShowTimer}
                    timerTime={timerTime}
                />}
            <form onSubmit={handleSubmit}>
                <div className="day-title">
                    Day <span className="day-title-number">{allExerciseEls.length > 0 && currentUserWorkoutData.workouts.length + 1}</span>
                </div>
                {allExerciseEls}
                <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleFormChange} tabIndex='-1' autoComplete="off"></input>
                <input type='password' name='pword' className="password-input" value={formData.pword} onChange={handleFormChange}></input>
                <button type="submit" className="submit-btn" id="submit" >Submit Workout</button>
            </form>


        </main>
    )
}