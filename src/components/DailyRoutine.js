import { useState, useEffect } from 'react'

function DailyRoutine(props) {

    const { currentUserWorkoutData } = props
    const [exerciseEls, setExerciseEls] = useState()
    const [tempFormData, setTempFormData] = useState({
        pword: '',
        honeyp: ''
    })
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
            exerciseName: 'pull ups',
            dailyIncrement: .5,
            unit: 'reps'  
        }
    ])

    useEffect(() => {
        if (currentUserWorkoutData) {
            const exerciseList = currentUserWorkoutData.dailyRoutine.map((exercise, index) => {
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

    const handleInputChange = (index, event) => {
        const { name, value } = event.target
        const newFormData = [...formData]
        newFormData[index][name] = value
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
        setFormData([...formData, { exerciseName: '', dailyIncrement: '', unit: 'reps' }])
    }

    const removeExerciseInput = (index) => {
        const newFormData = formData.filter((_, i) => i !== index)
        setFormData(newFormData)
    }

    // const [formData, setFormData] = useState([
    //     {
    //         exerciseName: 'push-ups',
    //         dailyIncrement: 1,
    //         unit: 'reps'  
    //     },{
    //         exerciseName: 'sit-ups',
    //         dailyIncrement: 1,
    //         unit: 'reps'  
    //     },{
    //         exerciseName: 'leg lifts',
    //         dailyIncrement: 1,
    //         unit: 'reps'  
    //     },{
    //         exerciseName: 'leg kicks',
    //         dailyIncrement: 1,
    //         unit: 'reps'  
    //     },{
    //         exerciseName: 'plank',
    //         dailyIncrement: 1.5 ,
    //         unit: 'seconds'  
    //     },{
    //         exerciseName: 'pull-ups',
    //         dailyIncrement: .5,
    //         unit: 'reps'  
    //     },{
    //         exerciseName: 'leg stretch',
    //         dailyIncrement: 1,
    //         unit: 'seconds'  
    //     }
    // ])

    function submitDailyRoutineForm(e) {
        e.preventDefault()
        console.log('running submit!')

        fetch(`https://dailyfitchallenge.com/workout-histories/update-routine/${props.tempCurrentUserId}`, {
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

    const submitDailyRoutine = async (e) => {
        e.preventDefault()
        console.log('running submit!')
        console.log(formData)


        if (formData.honeyp === '') {


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

                }
            } catch (error) {
                console.error('error: ', error.message)
            } 
        }

    }


    return (
        <main>
            <div className="daily-routine-container">
                <div>{currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 'Current' : 'Set'} Daily Routine:</div>
                
                    {/* {currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 
                        <div className='routine-list-container'>{exerciseEls}</div> : 
                        <div className='no-routine-message'>you haven't set a routine yet</div>} */}
                
            </div>
            <form className='daily-routine-form' onSubmit={submitDailyRoutine}>
                {
                    formData.map((exercise, index) => (
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
                            </div>
                        </div>
                    ))
                }
                <button type='button' onClick={addNewExerciseInput} className='add-exercise-button'>+ <br/>add another exercise</button>
                <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleTempFormDataChange} tabIndex='-1' autoComplete="off"></input>
                <label htmlFor='pword' className='password-label'>password</label>
                <input type='password' name='pword' className="daily-routine-password" value={formData.pword} onChange={handleTempFormDataChange}></input>
                <div id='incorrect-password-message' className='hide'>incorrect password</div>
                <div id='success-message' className='hide'>routine set!</div>
                <button type='submit' className='set-routine-btn'>{currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 ? 'update' : 'set'} routine</button>
            </form>
        </main>
    )
}

export default DailyRoutine