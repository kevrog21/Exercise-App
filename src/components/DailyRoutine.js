import { useState, useEffect, useContext } from 'react'
import BackButton from './BackButton'
import { ThemeContext } from './ThemeProvider'
import { ReactComponent as EditIcon } from '../assets/edit_icon.svg'

function DailyRoutine(props) {
    const { currentUserWorkoutData, retrieveData } = props
    const [editRoutineMode, setEditRoutineMode] = useState(false)
    const [exerciseEls, setExerciseEls] = useState()
    const [formErrors, setFormErrors] = useState([])
    const [showUpdateMessage, setShowUpdateMessage] = useState(false)
    const [tempFormData, setTempFormData] = useState({
        pword: '',
        honeyp: ''
    })
    const [formData, setFormData] = useState([
        {
            challengeMode: 'classic'
        },
        {
            exerciseName: 'push-ups',
            dailyIncrement: 1,
            unit: 'reps'  
        },{
            exerciseName: 'sit-ups',
            dailyIncrement: 1,
            unit: 'reps'  
        },{
            exerciseName: 'pull ups',
            dailyIncrement: .5,
            unit: 'reps'  
        }
    ])
    const { theme } = useContext(ThemeContext)
    const themeClass = `${theme}-theme`

    useEffect(() => {
        if (currentUserWorkoutData) {
            const exerciseList = currentUserWorkoutData.dailyRoutine.slice(1).map((exercise, index) => {
                return (
                    <div key={index} className='routine-list-item'>
                        <span>- {exercise.exerciseName}</span>
                        <div className='routine-details'> daily increment: {exercise.dailyIncrement}</div>
                        <div className='routine-details'> unit: {exercise.unit}</div>
                    </div>
                )
            })
            setExerciseEls(exerciseList)
        }
    }, [currentUserWorkoutData])

    useEffect(() => {
        if (editRoutineMode && currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0) {
            setFormData(currentUserWorkoutData.dailyRoutine)
        }

    }, [editRoutineMode])

    useEffect(() => {
        if (showUpdateMessage) {
            setTimeout(() => {
                setShowUpdateMessage(false)
            }, 2000)
        }
    }, [showUpdateMessage])

    const handleInputChange = (index, event) => {
        const { name, value } = event.target
        const newFormData = [...formData]
        if (name === 'dailyIncrement') {
            newFormData[index][name] = value === '' ? '' : Number(value)
        } else {
            if (index === 0) {
                newFormData[index] = { [name]: value }
            } else {
                newFormData[index][name] = value
            }
        }
        console.log('new data: ', newFormData)
        
        setFormData(newFormData)
    }

    const handleTempFormDataChange = (e) => {
        const { name, value } = e.target
        
        setTempFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    }

    const addNewExerciseInput = () => {
        setFormData([...formData, { exerciseName: '', dailyIncrement: 1, unit: 'reps' }])
    }

    const removeExerciseInput = (index) => {
        const newFormData = formData.filter((_, i) => i !== index)
        setFormData(newFormData)
    }

    const validateFormData = () => {
        const newErrors = []

        formData.slice(1).forEach((exercise, index) => {
            if (!exercise.exerciseName) {
                newErrors.push(`A name is required for exercise ${index + 1}`)
            }
            if (!exercise.dailyIncrement) {
                newErrors.push(`A daily increment is required for exercise ${index + 1}`)
            }
            if (!exercise.unit) {
                newErrors.push(`A unit is required for exercise ${index + 1}`)
            }
        })

        setFormErrors(newErrors)
        return newErrors.length === 0
    }

    const submitDailyRoutine = async (e) => {
        e.preventDefault()
        console.log('running submit!')
        console.log(formData)
        const successMessageEl = document.getElementById('success-message')
        const incorrectPasswordEl = document.getElementById('incorrect-password-message')

        if (tempFormData.honeyp === '') {
            if (validateFormData()) {
                try {
                    const response = await fetch('https://dailyfitchallenge.com/workout-histories/check-passwords', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 
                            pword: tempFormData.pword,
                            honeyp: tempFormData.honeyp 
                        })
                    })
        
                    if (!response.ok) {
                        throw new Error('Failed to check password.')
                    }
        
                    const { valid } = await response.json()
                    console.log(valid)
        
                    if (valid) {

                        console.log('about to send post request')
    
                        const postResponse = await fetch(`https://dailyfitchallenge.com/workout-histories/update-routine/${props.tempCurrentUserId}`, {
                            method: "POST",
                            body: JSON.stringify(formData),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        })
    
                        if (!postResponse.ok) {
                            throw new Error('Failed to post set routine')
                        }

                        const postData = await postResponse.json()
                        console.log('post data', postData)
                        retrieveData()
                        setTempFormData({
                            pword: '',
                            honeyp: ''
                        })
                        setShowUpdateMessage(true)
                        setEditRoutineMode(false)
                    }
                } catch (error) {
                    console.error('error: ', error.message)
                } 
            } else {
                console.error('Incorrect password')
                incorrectPasswordEl.classList.remove('hide')
            }
        }
    }

    return (
        <main>
            {showUpdateMessage && 
                <div className='routine-success-container'>
                    <div className='routine-success-message-box'>
                        Routine Updated!
                    </div>
                </div>}
            <div>
                <div className={`detail-page-icon-container ${theme}-theme`}>
                    <BackButton />
                    { currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 && !editRoutineMode ?
                        <EditIcon 
                            className={`edit-icon-symbol edit-icon-daily-routine ${themeClass}`}
                            onClick={() => setEditRoutineMode(true)}
                        /> :
                        <div onClick={() => setEditRoutineMode(false)} className='red regular default-font edit-icon-daily-routine'>cancel</div>
                    }
                </div>
                { currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 && !editRoutineMode ? 
                    <div className='challenge-mode-container'>
                        <div>Challenge Mode:</div>
                        <div className='challenge-mode-display'>from user data</div>
                    </div> : 
                    '' 
                }
                { !editRoutineMode && <div className='daily-routine-title'>{currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 'Current' : 'Set'} Daily Routine:</div> }

                
                
                { currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 && !editRoutineMode ? 
                    <div className='routine-list-container'>{exerciseEls}</div> : 
                    '' 
                }

            </div>
            { editRoutineMode &&
                <div>
                    <form className='daily-routine-form' onSubmit={submitDailyRoutine}>
                        <div className='challenge-mode-container'>
                            <label htmlFor='challengeMode' className='' >Challenge Mode:</label>
                            <select className={`challenge-mode-select ${formData[0].challengeMode ? 'has-selection' : ''}`} name='challengeMode' onChange={(e) => handleInputChange(0, e)} value={formData.challengeMode}>
                                <option value=''>please select...</option>
                                <option value='classic'>classic</option>
                                <option value='split'>split</option>
                                <option value='increment'>increment</option>
                            </select>
                        </div>
                        <div className='daily-routine-title'>{currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 'Current' : 'Set'} Daily Routine:</div>
                        { formData.slice(1).map((exercise, index) => (
                                <div key={index}>
                                    <div className='daily-routine-input-continer'>
                                    <div className='routine-exercise-number'>Exercise {index + 1}</div>
                                        <label htmlFor="exerciseName">Exercise Name</label>
                                        <input 
                                            type="text"
                                            name="exerciseName"
                                            placeholder=""
                                            value={exercise.exerciseName}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                        <div className='incremenet-unit-container'>
                                            <div className='increment-container'>
                                                <label htmlFor="dailyIncrement" className='incremenet-label'>Increment</label>
                                                <input className='incremenet-input'
                                                    type="number"
                                                    name="dailyIncrement"
                                                    placeholder=""
                                                    value={exercise.dailyIncrement}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                />
                                            </div>
                                            <div  className='unit-container'>
                                                <label htmlFor="unit" className='unit-label'>Unit</label>
                                                <select className='unit-input'
                                                    name="unit"
                                                    value={exercise.unit}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                >
                                                    <option value="reps">reps</option>
                                                    <option value="seconds">seconds</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="button" className='routine-remove-btn' onClick={() => removeExerciseInput(index)}>remove</button>
                                    </div>
                                </div>
                            ))
                        }
                        <button type='button' onClick={addNewExerciseInput} className='add-exercise-button'>+ <br/>add another exercise</button>
                        <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleTempFormDataChange} tabIndex='-1' autoComplete="off"></input>
                        <label htmlFor='pword' className='password-label'>password</label>
                        <input type='password' name='pword' className="daily-routine-password" value={formData.pword} onChange={handleTempFormDataChange}></input>
                        <div id='incorrect-password-message' className='hide'>incorrect password</div>
                        {formErrors.length > 0 && (
                            <div>
                                {formErrors.map((error, index) => (
                                    <p key={index} className='red'>{error}</p>
                                ))}
                            </div>
                        )}
                        <div id='success-message' className='hide'>routine set!</div>
                        <button type='submit' className='set-routine-btn'>{currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 'update' : 'set'} routine</button>
                    </form>
                </div> 
            }
        </main>
    )
}

export default DailyRoutine