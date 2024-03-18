import { useState, useEffect } from "react"

function CurrentWorkout(props) {

    const [allExerciseEls, setAllExerciseEls] = useState([])

    const [formData, setFormData] = useState({
        pushups: 4,
        pullups: 4,
        plank: 4
    })

    const currentUserWorkoutHistory = props.currentUserWorkoutData && props.currentUserWorkoutData


    useEffect(() => {
        if (currentUserWorkoutHistory) {
            // const currentExerciseList = currentUsersDailyExercises.map((item,index) => {
            //     return (
            //         <div key={index}>
            //             {item}
            //         </div>
            //     )
            // })
            // setAllExerciseEls(currentExerciseList)
        }
    }, [currentUserWorkoutHistory])

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log('running submit')

        fetch(`http://localhost:5000/workout-histories/update/${props.tempCurrentUserId}`, {
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
            <div className="workout-form-container">
                {allExerciseEls.length > 0 && allExerciseEls}
            </div>
            <form onSubmit={handleSubmit}>
                <button type="submit" className="submit-btn" id="submit" >Submit Workout</button>
            </form>
        </main>
    )
}

export default CurrentWorkout