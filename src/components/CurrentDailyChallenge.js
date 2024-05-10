import { useState, useEffect } from "react"
import { useNavigateToLink } from './ToHomeScreen'
import Timer from "./Timer"

export default function CurrentDailyChallenge(props) {
    const navigate = useNavigateToLink()
    const [allExerciseEls, setAllExerciseEls] = useState([])
    const [checkboxes, setCheckboxes] = useState({})
    
    const { currentUserWorkoutData, userCompletedTodaysWorkout } = props

    const [formData, setFormData] = useState({honeyp: '', pword: ''})

    const [showTimer, setShowTimer] = useState(false)
    const [timerTime, setTimerTime] = useState(0)

    useEffect(() => {
        if (currentUserWorkoutData) {
            const dailyChallengeExercises = currentUserWorkoutData.dailyRoutine.map((exercise, index) => {
                return (
                    <div key={index} className='current-workout-list-item'>
                        <div className='exercise-timer-container'>
                            <div className='exercise'>
                                <div className='exercise-label'>{exercise.exerciseName}:
                                    <span className='required-rep-label'>{Math.ceil(exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1))} {exercise.unit}</span>
                                </div>
                                <div className='rep-scroller-container'>
                                    <div className='current-rep-label'>current</div>
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
        }
    }, [currentUserWorkoutData])

    return (
        <main className="page-margin-top">
            <div className="day-title">
                Day <span className="day-title-number">{allExerciseEls.length > 0 && currentUserWorkoutData.workouts.length + 1}</span>
            </div>
            {allExerciseEls}


        </main>
    )
}