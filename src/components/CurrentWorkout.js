import { useState, useEffect } from "react"
import { useNavigateToLink } from './ToHomeScreen'
import Timer from "./Timer"

function CurrentWorkout(props) {
    const navigate = useNavigateToLink()
    const [allExerciseEls, setAllExerciseEls] = useState([])
    const [checkboxes, setCheckboxes] = useState({})
    
    const { currentUserWorkoutData, userCompletedTodaysWorkout } = props

    const [formData, setFormData] = useState({honeyp: '', pword: ''})

    const [showTimer, setShowTimer] = useState(false)
    const [timerTime, setTimerTime] = useState(0) 

    useEffect(() => {
        console.log('Checkboxes state:', checkboxes);
        console.log('formData', formData)
      }, [checkboxes, formData]);

    const handleCheckboxChange = (name, exerciseId, dailyIncrement, checked, index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [exerciseId]: checked ? Math.ceil(dailyIncrement * (currentUserWorkoutData.workouts.length + 1)) : 0
        }))
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [name]: !prevCheckboxes[name],
        }))
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target
        const newValue = parseInt(value)
        const isChecked = newValue > (currentUserWorkoutData.workouts.length + 1)

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue
        }))
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [name]: isChecked
        }))
    }

    useEffect(() => {
        if (currentUserWorkoutData) {
            const initialFormData = currentUserWorkoutData.dailyRoutine.reduce((acc, exercise, index) => {
                return { ...acc, [exercise.exerciseName]: 0}
            }, {honeyp: '', pword: ''})
            setFormData(initialFormData)

            const initialCheckBoxData = currentUserWorkoutData.dailyRoutine.reduce((acc, exercise, index) => {
                const checkboxName = `checkbox_${index}`
                return { ...acc, [checkboxName]: false}
            }, {})
            setCheckboxes(initialCheckBoxData)
        }
    },[currentUserWorkoutData])

    useEffect(() => {
        if (currentUserWorkoutData) {
            const currentExerciseList = currentUserWorkoutData.dailyRoutine.map((exercise,index) => {
                const checkboxName = `checkbox_${index}`
                return (
                    <div key={index} className='current-workout-list-item'>
                        <div className="label-timer-container">
                            <label className="label-container">
                                <div className='routine-exercise'>
                                    {exercise.exerciseName}: <span className='exercise-quantity'>{Math.ceil(exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1))} {exercise.unit}</span>
                                </div>
                                <input 
                                    className='exercise-completion-checkbox'
                                    type='checkbox'
                                    name={checkboxName}
                                    checked={formData[exercise.exerciseName] === Math.ceil(exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1))} 
                                    // onChange={(e) => handleCheckboxChange(e.target.name, exercise.exerciseName, exercise.dailyIncrement, e.target.checked, index)}
                                     />
                            </label>
                             {exercise.unit === 'seconds' && 
                                <div className='timer-icon-container'
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
                                </div>} 
                        </div>
                    </div>
                )
            })
            setAllExerciseEls(currentExerciseList)
        }
    }, [currentUserWorkoutData, checkboxes])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const incompleteMessageEl = document.getElementById('incomplete-workout-message')
        const successMessageEl = document.getElementById('success-message')
        const incorrectPasswordEl = document.getElementById('incorrect-password-message')
        const alreadyCompletedWorkoutEl = document.getElementById('already-completed-message')

        if (formData.honeyp === '' && Object.values(checkboxes).every(value => value === true)) {
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
                    if (!userCompletedTodaysWorkout) {
                        const currentTime = new Date()
                        delete formData.honeyp
                        delete formData.pword
                        
                        const finalWorkoutData = {
                            timeStamp: currentTime,
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
    
                        console.log('successfully posted!')
                        incompleteMessageEl.classList.add('hide')
                        incorrectPasswordEl.classList.add('hide')
                        successMessageEl.classList.remove('hide')
    
                        const postData = await postResponse.json()
                        console.log(postData)
                        setTimeout(() => {
                            navigate('/')
                        }, 0)
                    } else {
                        incorrectPasswordEl.classList.add('hide')
                        incompleteMessageEl.classList.add('hide')
                        alreadyCompletedWorkoutEl.classList.remove('hide')
                    }
                } else {
                    console.error('Incorrect password')
                    incorrectPasswordEl.classList.remove('hide')
                    incompleteMessageEl.classList.add('hide')
                }
            } catch (error) {
                console.error('error: ', error.message)
            }
        } else {
            incompleteMessageEl.classList.remove('hide')
        }
        


        // if (formData.honeyp === '' && Object.values(checkboxes).every(value => value === true)) {
        //     if (formData.pword === unsecureTempPassword ) {
        //         if (!userCompletedTodaysWorkout) {
        //             const currentTime = new Date()
        //             delete formData.honeyp
        //             delete formData.pword
                    
        //             const finalWorkoutData = {
        //                 timeStamp: currentTime,
        //                 ...formData
        //             }
            
        //             console.log('running submit')
            
        //             fetch(`http://54.67.59.120/workout-histories/update/${props.tempCurrentUserId}`, {
        //                 method: "POST",
        //                 body: JSON.stringify(finalWorkoutData), 
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 }
        //             })
        //             .then(res => {
        //                 res.json()
        //                 if (res.ok) {
        //                     console.log('successfully posted!')
        //                     incompleteMessageEl.classList.add('hide')
        //                     incorrectPasswordEl.classList.add('hide')
        //                     successMessageEl.classList.remove('hide')
        //                 }
        //             })
        //             .then(data => console.log(data))
        //         } else {
        //             incorrectPasswordEl.classList.add('hide')
        //             incompleteMessageEl.classList.add('hide')
        //             alreadyCompletedWorkoutEl.classList.remove('hide')
        //         }
        //     } else {
        //         incorrectPasswordEl.classList.remove('hide')
        //         incompleteMessageEl.classList.add('hide')
        //     }
            
        // } else { 
        //     incompleteMessageEl.classList.remove('hide')
        // }
    }

    return (
        <main>
            {showTimer && 
                <Timer 
                    showTimer={showTimer}
                    setShowTimer={setShowTimer}
                    timerTime={timerTime}
                />}
            <div className="workout-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="current-workout-title">Day {allExerciseEls.length > 0 && currentUserWorkoutData.workouts.length + 1}:</div>
                    {allExerciseEls.length > 0 && allExerciseEls}
                    <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleFormChange} tabIndex='-1' autoComplete="off"></input>
                    <input type='password' name='pword' value={formData.pword} onChange={handleFormChange}></input>
                    <button type="submit" className="submit-btn" id="submit" >Submit Workout</button>
                    <div id='incomplete-workout-message' className='hide'>Make sure to complete all of today's exercises before submitting!</div>
                    <div id='incorrect-password-message' className='hide'>incorrect password</div>
                    <div id='success-message' className='hide'>Congrats!<br/> You did it!</div>
                    <div id='already-completed-message' className="hide">You already completed today's workout! You can only complete one per day.</div>
                </form>
            </div>
        </main>
    )
}

export default CurrentWorkout