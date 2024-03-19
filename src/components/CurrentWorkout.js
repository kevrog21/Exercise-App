import { useState, useEffect } from "react"

function CurrentWorkout(props) {

    const [allExerciseEls, setAllExerciseEls] = useState([])
    const [checkboxes, setCheckboxes] = useState({})
    
    const { currentUserWorkoutData } = props

    const [formData, setFormData] = useState({honeyp: ''})

    useEffect(() => {
        console.log('Checkboxes state:', checkboxes);
        console.log('formData', formData)
      }, [checkboxes, formData]);

    const handleCheckboxChange = (name, exerciseId, dailyIncrement, checked, index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [exerciseId]: checked ? dailyIncrement * (currentUserWorkoutData.workouts.length + 1) : 0
        }))
        setCheckboxes((prevCheckboxes) => ({
            ...prevCheckboxes,
            [name]: !prevCheckboxes[name],
        }))
    }

    const handleFormChange = (event) => {
        const { name, value } = event.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    useEffect(() => {
        if (currentUserWorkoutData) {
            const initialFormData = currentUserWorkoutData.dailyRoutine.reduce((acc, exercise, index) => {
                return { ...acc, [exercise.exerciseName]: 0}
            }, {honeyp: ''})
            setFormData(initialFormData)
        }
    },[currentUserWorkoutData])

    useEffect(() => {
        if (currentUserWorkoutData) {
            const currentExerciseList = currentUserWorkoutData.dailyRoutine.map((exercise,index) => {
                const checkboxName = `checkbox_${index}`
                return (
                    <div key={index} className='routine-list-item'>
                        <label className="label-container">
                            <div className='routine-exercise'>
                                {exercise.exerciseName}: <span className='exercise-quantity'>{exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1)} {exercise.unit}</span>
                            </div>
                            <input 
                                className='exercise-completion-checkbox'
                                type='checkbox'
                                name={checkboxName}
                                checked={formData[exercise.exerciseName] === exercise.dailyIncrement * (currentUserWorkoutData.workouts.length + 1)} 
                                onChange={(e) => handleCheckboxChange(e.target.name, exercise.exerciseName, exercise.dailyIncrement, e.target.checked, index)} />
                        </label>
                    </div>
                )
            })
            setAllExerciseEls(currentExerciseList)
        }
    }, [currentUserWorkoutData, checkboxes])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.honeyp === '') {
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
    }

    return (
        <main>
            <div className="workout-form-container">
                <form onSubmit={handleSubmit}>
                    <div className="current-workout-title">Day {allExerciseEls.length > 0 && currentUserWorkoutData.workouts.length + 1}:</div>
                    {allExerciseEls.length > 0 && allExerciseEls}
                    <input type='text' name='honeyp' className='honeyp' value={formData.honeyp} onChange={handleFormChange} tabIndex='-1' autoComplete="off"></input>
                    <button type="submit" className="submit-btn" id="submit" >Submit Workout</button>
                </form>
            </div>
        </main>
    )
}

export default CurrentWorkout