import { useState, useEffect, useContext} from "react"
import { useNavigateToLink } from './ToHomeScreen'
import Timer from "./Timer"
import BackButton from './BackButton'
import { ThemeContext } from './ThemeProvider'

export default function CurrentDailyChallenge(props) {
    const navigate = useNavigateToLink()
    const [allExerciseEls, setAllExerciseEls] = useState([])
    const [exercisesToShow, setExercisesToShow] = useState()
    
    const { currentUserWorkoutData, userCompletedTodaysWorkout, mostRecentCompletedChallengeData, userCompletedChallengeYesterday, userCanContinueChallenge, userIsContinuingChallenge } = props

    const [formData, setFormData] = useState({honeyp: '', pword: ''})
    const [isChallengeComplete, setIsChallengeComplete] = useState(false)
    const [currentChallengeMode, setCurrentChallengeMode] = useState(null)

    const [lastButtonClickTime, setLastButtonClickTime] = useState(0)
    const [repChangeInTransition, setRepChangeInTransition] = useState(false)
    const [repInputChangeTransition, setRepInputChangeTransition] = useState(false)
    const [visibleRepsContainers, setVisibleRepsContainers] = useState({})
    const [resetForm, setResetForm] = useState(false)

    const [showTimer, setShowTimer] = useState(false)
    const [timerTime, setTimerTime] = useState(0)
    const [timerExerciseName, setTimerExerciseName] = useState()

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`

    const [challengeNumber, setChallengeNumber] = useState()

    useEffect(() => {
        if (userIsContinuingChallenge) {
            console.log(userIsContinuingChallenge)
        } else {
            if (mostRecentCompletedChallengeData && Object.entries(mostRecentCompletedChallengeData).length > 0 && currentUserWorkoutData) {
                setChallengeNumber(mostRecentCompletedChallengeData.challengeNumber + 1)
                
                const savedFormDataLocalStorage = localStorage.getItem('formData')
                const formDate = localStorage.getItem('formDate')
                const currentDate = new Date().toDateString()
                console.log('local storage here', JSON.parse(savedFormDataLocalStorage))

                if (savedFormDataLocalStorage && formDate === currentDate) {
                    setFormData(JSON.parse(savedFormDataLocalStorage))
                } else {
                    localStorage.removeItem('formData')
                    localStorage.removeItem('formDate')

                    const initialFormData = currentUserWorkoutData.dailyRoutine.slice(1).reduce((acc, exercise, index) => {
                        return { 
                            ...acc, 
                            [exercise.exerciseName]: {
                                count: 0,
                                goalReps: mostRecentCompletedChallengeData[exercise.exerciseName] ? mostRecentCompletedChallengeData[exercise.exerciseName].goalReps + exercise.dailyIncrement : exercise.dailyIncrement,
                                isComplete: false,
                                repChange: 0,
                                manualRepInput: '',
                                previousSets: []
                            }
                        }
                    }, {
                        honeyp: '', 
                        pword: '', 
                        challengeNumber: mostRecentCompletedChallengeData.challengeNumber + 1
                    })
                    setFormData(initialFormData)
                    console.log('most recent completed', mostRecentCompletedChallengeData)
                    console.log('form data at 80', formData)
                }
                
            } else if (currentUserWorkoutData) {
                setChallengeNumber(1)
                const initialFormData = currentUserWorkoutData.dailyRoutine.slice(1).reduce((acc, exercise, index) => {
                    return { 
                        ...acc, 
                        [exercise.exerciseName]: {
                            count: 0,
                            goalReps: exercise.dailyIncrement,
                            isComplete: false,
                            repChange: 0,
                            manualRepInput: '',
                            previousSets: []
                        }
                    }
                }, {
                    honeyp: '', 
                    pword: '', 
                    challengeNumber: 1
                })
                setFormData(initialFormData)
            }
            console.log('userIsContinuingChallenge', userIsContinuingChallenge)
        } 
    }, [mostRecentCompletedChallengeData, userIsContinuingChallenge, resetForm])

    const handleIncrement = (exerciseName) => {
        setLastButtonClickTime(Date.now())
        setFormData(prevFormData => ({
            ...prevFormData,
            [exerciseName]: {
                ...prevFormData[exerciseName],
                count: prevFormData[exerciseName].count + 1,
                repChange: prevFormData[exerciseName].repChange + 1,
                isComplete: prevFormData[exerciseName].count + 1 >= prevFormData[exerciseName].goalReps
            }
        }))
    }

    const handleDecrement = (exerciseName) => {
        setLastButtonClickTime(Date.now())
        setFormData(prevFormData => ({
            ...prevFormData,
            [exerciseName]: {
                ...prevFormData[exerciseName],
                count: prevFormData[exerciseName].count > 0 ? prevFormData[exerciseName].count - 1 : 0,
                repChange: prevFormData[exerciseName].count > 0 ? prevFormData[exerciseName].repChange - 1 : prevFormData[exerciseName].repChange,
                isComplete: prevFormData[exerciseName].count - 1 >= prevFormData[exerciseName].goalReps
            }
        }))
    }

    useEffect(() => {
        if (lastButtonClickTime !== 0) {
            if (repChangeInTransition) {
                const allRepChangeElements = document.querySelectorAll('.rep-change-visual, .rep-change-visual-timer')
                allRepChangeElements.forEach(element => {
                    element.classList.remove('rep-change-visual-fade')
                })
            }
            const fade = setTimeout(() => {
                setRepChangeInTransition(true)
                const allRepChangeElements = document.querySelectorAll('.rep-change-visual, .rep-change-visual-timer')
                allRepChangeElements.forEach(element => {
                    element.classList.add('rep-change-visual-fade')
                })
            }, 2000)
            const timer = setTimeout(() => {
                setFormData((prevFormData) => {
                    const updatedFormData = { ...prevFormData }
                    Object.keys(updatedFormData).slice(1).forEach((key) => {
                        if (key !== 'honeyp' && key !== 'pword' && key !== 'challengeNumber' && updatedFormData[key].repChange !== 0 && !repInputChangeTransition) {
                            updatedFormData[key] = { 
                                ...updatedFormData[key], 
                                previousSets: [...updatedFormData[key].previousSets, updatedFormData[key].repChange],
                                repChange: 0 }
                        } 
                        else if (key !== 'honeyp' && key !== 'pword' && key !== 'challengeNumber') {
                            updatedFormData[key] = { 
                                ...updatedFormData[key], 
                                repChange: 0 }
                        }
                    })
                    localStorage.setItem('formData', JSON.stringify(updatedFormData))
                    localStorage.setItem('formDate', new Date().toDateString())
                    console.log('saved updatedFormData', updatedFormData)

                    return updatedFormData
                })
                setRepInputChangeTransition(false)
                const allRepChangeElements = document.querySelectorAll('.rep-change-visual, .rep-change-visual-timer')
                allRepChangeElements.forEach(element => {
                    element.classList.remove('rep-change-visual-fade')
                })
                setRepChangeInTransition(false)
                //if logged in, send to database and add 'changes saved' to UI
            }, 2400)

            return () => {
                clearTimeout(fade)
                clearTimeout(timer)
            }
        }
    }, [lastButtonClickTime])

    const pushRepToPrevReps = (exerciseName) => {
        setRepInputChangeTransition(true)
        setLastButtonClickTime(Date.now())
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData }
            const repValue = parseInt(updatedFormData[exerciseName].manualRepInput, 10)

            if (!isNaN(repValue) && repValue !== 0) {
                updatedFormData[exerciseName] = {
                    ...updatedFormData[exerciseName],
                    count: updatedFormData[exerciseName].count + repValue,
                    isComplete: prevFormData[exerciseName].count + repValue >= prevFormData[exerciseName].goalReps,
                    repChange: repValue,
                    previousSets: [...updatedFormData[exerciseName].previousSets, repValue],
                    manualRepInput: '',
                }
            }

            return updatedFormData
        })
    }

    const markComplete = (exerciseName) => {
        console.log('markComplete running')
        setShowTimer(false)
        setRepInputChangeTransition(true)
        setLastButtonClickTime(Date.now())
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData }
            const repValue = Math.ceil(updatedFormData[exerciseName].goalReps - updatedFormData[exerciseName].count)

            if (repValue > 0) {
                updatedFormData[exerciseName] = {
                    ...updatedFormData[exerciseName],
                    count: updatedFormData[exerciseName].count + repValue,
                    isComplete: prevFormData[exerciseName].count + repValue >= prevFormData[exerciseName].goalReps,
                    repChange: repValue,
                    previousSets: [...updatedFormData[exerciseName].previousSets, repValue],
                    manualRepInput: '',
                }
                return updatedFormData
            } else {
                return updatedFormData
            }
        })
    }

    const clearReps = (exerciseName) => {
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData }
            updatedFormData[exerciseName] = {
                ...updatedFormData[exerciseName],
                count: 0,
                isComplete: false,
                repChange: 0,
                previousSets: [],
                manualRepInput: '',
            }
            return updatedFormData
        })
    }

    const saveTimerProgress = (exerciseName, currentTimerTime) => {
        setShowTimer(false)
        setRepInputChangeTransition(true)
        setLastButtonClickTime(Date.now())
        setFormData((prevFormData) => {
            const updatedFormData = { ...prevFormData }
            const repValue = Math.ceil((formData[exerciseName].goalReps - formData[exerciseName].count) - currentTimerTime)

            if (repValue > 0) {
                updatedFormData[exerciseName] = {
                    ...updatedFormData[exerciseName],
                    count: updatedFormData[exerciseName].count + repValue,
                    isComplete: prevFormData[exerciseName].count + repValue >= prevFormData[exerciseName].goalReps,
                    repChange: repValue,
                    previousSets: [...updatedFormData[exerciseName].previousSets, repValue],
                    manualRepInput: '',
                }
                return updatedFormData
            } else {
                return updatedFormData
            }
        })
    }

    const handleRepInputChange = (exerciseName, value) => {
        const newFormData = {
            ...formData,
            [exerciseName]: {
                ...formData[exerciseName],
                manualRepInput: value,
            }
        }
        setFormData(newFormData)
    }

    const handleRepInputKeydown = (exerciseName, e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            pushRepToPrevReps(exerciseName)
        }
    }

    const showPreviousReps = (exerciseName) => {
        setVisibleRepsContainers((prevState) => ({
            ...prevState,
            [exerciseName]: !prevState[exerciseName]
        }))
    }

    const checkCompletionStatus = (objectToCheck) => {
        const relevantExercises = exercisesToShow.map(exercise => exercise.exerciseName)

        const itemsWithIsCompleteKey = Object.keys(objectToCheck)
        .filter(key => 
            objectToCheck[key].hasOwnProperty('isComplete') && relevantExercises.includes(key)
        )
        .map(key => objectToCheck[key].isComplete)

        if (itemsWithIsCompleteKey.length > 0 && itemsWithIsCompleteKey.every(isComplete => isComplete)) {
            setIsChallengeComplete(true)
        } else {
            setIsChallengeComplete(false)
        }
    }

    useEffect(() => {
        if (currentUserWorkoutData && Object.keys(formData).length > 2) {
            setCurrentChallengeMode(currentUserWorkoutData.dailyRoutine[0].challengeMode)
        }
    }, [currentUserWorkoutData, formData])

    useEffect(() => {
        if (currentUserWorkoutData && Object.keys(formData).length > 2) {
            console.log('challenge mode!: ', currentChallengeMode)
            console.log('challenge mode!: ', mostRecentCompletedChallengeData.challengeNumber)
            const exercises = [...currentUserWorkoutData.dailyRoutine.slice(1)]
            const totalExercises = exercises.length
            let todaysExercises
            const generateExerciseList = () => {
                if (currentChallengeMode === 'classic') {
                    const isOddDay = mostRecentCompletedChallengeData.challengeNumber % 2 === 1
                    const midpoint = Math.ceil(totalExercises / 2)
                    //next split into A/B routine

                    if (mostRecentCompletedChallengeData.challengeNumber > 199) {
                        // A/B routine + 2 exercises off
                        const selectedHalf = isOddDay ? exercises.slice(midpoint) : exercises.slice(0, midpoint)
                        const skipIndex1 = mostRecentCompletedChallengeData.challengeNumber % selectedHalf.length
                        const skipIndex2 = (skipIndex1 + 1) % selectedHalf.length
                        todaysExercises = selectedHalf.filter((_, index) => index !== skipIndex1 && index !== skipIndex2)
                    } else if (mostRecentCompletedChallengeData.challengeNumber > 159) {
                        // A/B routine + 1 exercise off
                        const selectedHalf = isOddDay ? exercises.slice(midpoint) : exercises.slice(0, midpoint)
                        const skipIndex = mostRecentCompletedChallengeData.challengeNumber % selectedHalf.length
                        todaysExercises = selectedHalf.filter((_, index) => index !== skipIndex)
                    } else if (mostRecentCompletedChallengeData.challengeNumber > 119) {
                        // A/B routine
                        todaysExercises = isOddDay ? exercises.slice(midpoint) : exercises.slice(0, midpoint)
                    } else if (mostRecentCompletedChallengeData.challengeNumber > 79) {
                        // 2 exercises off
                        const skipIndex1 = mostRecentCompletedChallengeData.challengeNumber % totalExercises
                        const skipIndex2 = (skipIndex1 + 1) % totalExercises
                        todaysExercises = exercises.filter((_, index) => index !== skipIndex1 && index !== skipIndex2)
                    } else if (mostRecentCompletedChallengeData.challengeNumber > 39) {
                        // 1 exercise off
                        const adjustedChallengeNumber = mostRecentCompletedChallengeData.challengeNumber - 40
                        const skipIndex = adjustedChallengeNumber % totalExercises
                        todaysExercises = exercises.filter((_, index) => index !== skipIndex)
                    } else {
                        // full routine
                        todaysExercises = exercises
                    }

                    setExercisesToShow(todaysExercises)
                    
                } else if (currentChallengeMode === 'increment') {
                    setExercisesToShow(exercises)
                }
            }
            generateExerciseList()
        }
    }, [currentChallengeMode])

    useEffect(() => {
        if (exercisesToShow) {
        console.log("exercisesToShow", exercisesToShow)
            const generateExerciseEls = () => {
                return exercisesToShow.map((exercise, index) => {
                    const completedCount = formData[exercise.exerciseName].count || 0
                    const goalReps = Math.ceil(formData[exercise.exerciseName].goalReps) || 1
                    const percentageCompleted = (completedCount / goalReps) * 100
                    return (
                        <div key={index} className='current-workout-list-item'>
                            {percentageCompleted == 0 && <div className='progress-bar-placer'></div>}
                            {percentageCompleted !== 0 && <div className={`exercise-progress-container ${visibleRepsContainers[exercise.exerciseName] ? '' : 'hide-progress-container'}`}>
                                {percentageCompleted !== 0 && <div className='count-completed-progress' style={{ width: `${percentageCompleted}%` }}>{formData[exercise.exerciseName].count}</div>}
                                {percentageCompleted !== 0 && <div className='progress-bar-indicator'></div>}
                                {percentageCompleted < 100 && <div className='count-remaining-progress'>{goalReps - formData[exercise.exerciseName].count}</div>}
                            </div>}
                            <div className='exercise-timer-container'>
                                <div className={`exercise ${formData[exercise.exerciseName].count >= goalReps ? 'completed-exercise' : ''} ${visibleRepsContainers[exercise.exerciseName] ? 'exercise-updating' : ''}`}>
                                    <div className='exercise-label' onClick={() => showPreviousReps(exercise.exerciseName)}>{exercise.exerciseName}:
                                        <span className='required-rep-label'>{goalReps} {exercise.unit}</span>
                                        {formData[exercise.exerciseName].count >= goalReps && <div className='exercise-completed-check'>✓</div>}
                                    </div>
                                    <div className='exercise-label-right-side'>
                                        <div className='rep-scroller-container'>
                                            <div className='current-rep-label'>current</div>
                                            <div className='rep-scroller'>
                                                <div className='increase-rep-button' onClick={() => handleIncrement(exercise.exerciseName)}></div>
                                                <div className='current-rep'>{formData[exercise.exerciseName].count}</div>
                                                <div className='decrease-rep-button' onClick={() => handleDecrement(exercise.exerciseName)}></div>
                                                {/* <div className='temp-button-container'>
                                                    <div className='temp-button' onClick={() => handleDecrement(exercise.exerciseName)}>-</div>
                                                    <div className='temp-button' onClick={() => handleIncrement(exercise.exerciseName)}>+</div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {exercise.unit === 'seconds' ?
                                <div className={`timer-background ${themeClass}`}>
                                    <div className="rep-change-visual-timer">{formData[exercise.exerciseName].repChange !== 0 && `${formData[exercise.exerciseName].repChange > 0 ? '+' : '-'}${Math.abs(formData[exercise.exerciseName].repChange)}`}</div>
                                    <div className='timer-icon-container'>
                                        <div className='timer-icon'
                                        onClick={() => {
                                            setTimerTime(Math.ceil(goalReps - formData[exercise.exerciseName].count))
                                            setTimerExerciseName(exercise.exerciseName)
                                            setShowTimer(true)
                                        }} >
                                            <div className="timer-top"></div>
                                            <div className="timer-stem"></div>
                                            <div className="timer-circle">
                                                <div className='timer-icon-text'>{Math.ceil(goalReps - formData[exercise.exerciseName].count)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <div className="rep-change-visual">{formData[exercise.exerciseName].repChange !== 0 && `${formData[exercise.exerciseName].repChange > 0 ? '+' : '-'}${Math.abs(formData[exercise.exerciseName].repChange)}`}</div>}
                            </div>
                            <div className={`previous-reps-container ${visibleRepsContainers[exercise.exerciseName] ? '' : 'hide-previous-reps-container'}`}>
                                <div>{formData[exercise.exerciseName].previousSets.join(' + ')}{formData[exercise.exerciseName].previousSets.length > 0 ? ' +' : ''}
                                    <div className='manual-rep-input-container'>
                                        <input 
                                            className="manual-rep-input"
                                            type='number'
                                            value={formData[exercise.exerciseName].manualRepInput || ''}
                                            onChange={(e) => handleRepInputChange(exercise.exerciseName, e.target.value)}
                                            onKeyDown={(e) => handleRepInputKeydown(exercise.exerciseName, e)}
                                            >
                                        </input>
                                        {<div className={`manual-rep-input-submit ${!formData[exercise.exerciseName].manualRepInput && 'opacity-none'}`} onClick={() => pushRepToPrevReps(exercise.exerciseName)}>OK</div>}
                                    </div>
                                </div>
                                {formData[exercise.exerciseName].count < goalReps ? 
                                <div onClick={() => markComplete(exercise.exerciseName)} className='mark-complete-btn'>mark complete</div> :
                                <div onClick={() => clearReps(exercise.exerciseName)} className='clear-reps-btn'>clear reps</div>}
                            </div>
                        </div>
                    )
                })
            }
            setAllExerciseEls(generateExerciseEls)
            checkCompletionStatus(formData)
        }
    }, [exercisesToShow, formData, visibleRepsContainers])

    const handleFormChange = (event) => {
        const { name, value } = event.target
        const newValue = (name === 'pword' || name === 'honeyp') ? value : parseInt(value)

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const successMessageEl = document.getElementById('success-message')
        const incorrectPasswordEl = document.getElementById('incorrect-password-message')
        const alreadyCompletedWorkoutEl = document.getElementById('already-completed-message')
        console.log(formData)

        if (formData.honeyp === '') {
            //send to database

            //if all of the formData items are complete, increase the current streak value in the database

            try {
                const response = await fetch('https://dailyfitchallenge.com/workout-histories/check-passwords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        pword: formData.pword,
                        honeyp: formData.honeyp 
                    })
                })
    
                if (!response.ok) {
                    throw new Error('Failed to check password.')
                }
    
                const { valid } = await response.json()
    
                console.log(valid)
    
                if (valid) {
                    if (!userCompletedTodaysWorkout && !userCanContinueChallenge) {
                        const currentTime = new Date()
                        delete formData.honeyp
                        delete formData.pword
                        
                        const finalWorkoutData = {
                            timeStamp: currentTime,
                            challengeComplete: isChallengeComplete,
                            ...formData
                        }
                
                        console.log('running submit')
    
                        const postResponse = await fetch(`https://dailyfitchallenge.com/workout-histories/update/${props.tempCurrentUserId}`, {
                            method: "POST",
                            body: JSON.stringify(finalWorkoutData), 
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
    
                        if (!postResponse.ok) {
                            throw new Error('Failed to post workout data.')
                        }

                        const newStreak = userCompletedChallengeYesterday && finalWorkoutData.challengeComplete ? currentUserWorkoutData.currentChallengeStreak + 1 : 1

                        const postStreakResponse = await fetch(`https://dailyfitchallenge.com/workout-histories/update-challenge-streak/${props.tempCurrentUserId}`, {
                            method: "POST",
                            body: JSON.stringify({ currentChallengeStreak: newStreak }), 
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })

                        if (!postStreakResponse.ok) {
                            throw new Error('Failed to post streak data.')
                        }
    
                        localStorage.removeItem('formData')
                        localStorage.removeItem('formDate')
                        console.log('successfully posted!')
                        incorrectPasswordEl.classList.add('hide')
                        successMessageEl.classList.remove('hide')
    
                        const postData = await postResponse.json()
                        console.log(postData)
                        setTimeout(() => {
                            navigate('/')
                        }, 0)
                    } else if (!userCompletedTodaysWorkout && userCanContinueChallenge) {

                    } else {
                        incorrectPasswordEl.classList.add('hide')
                        alreadyCompletedWorkoutEl.classList.remove('hide')
                    }
                } else {
                    console.error('Incorrect password')
                    incorrectPasswordEl.classList.remove('hide')
                }
            } catch (error) {
                console.error('error: ', error.message)
            }
        }
    }

    const handleFormReset = () => {
        localStorage.removeItem('formData')
        localStorage.removeItem('formDate')
        setResetForm((prevState) => (!prevState))
    }

    return (
        <main>
            <div className="page-margin-top">
            {showTimer && 
                <Timer 
                    showTimer={showTimer}
                    setShowTimer={setShowTimer}
                    timerTime={timerTime}
                    markComplete={markComplete}
                    saveTimerProgress={saveTimerProgress}
                    timerExerciseName={timerExerciseName}
                />}
            <BackButton />
            <form onSubmit={handleSubmit}>
                <div className="day-title">
                    Day <span className="day-title-number">{allExerciseEls.length > 0 && challengeNumber}</span>
                </div>
                <div>{currentChallengeMode}</div>
                {allExerciseEls}
                <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleFormChange} tabIndex='-1' autoComplete="off"></input>
                <input type='password' name='pword' className="password-input" value={formData.pword} onChange={handleFormChange}></input>
                <button type="submit" className="submit-btn" id="submit" >Submit Workout</button>
                <div id='incorrect-password-message' className='hide'>incorrect password</div>
                <div id='success-message' className='hide'>Congrats!<br/> You did it!</div>
                <div id='already-completed-message' className="hide">You already completed today's workout! You can only complete one per day.</div>
            </form>

            </div>
            <button className="form-reset-btn" onClick={handleFormReset}>reset form</button>
        </main>
    )
}