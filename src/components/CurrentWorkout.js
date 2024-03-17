import { useState, useEffect } from "react"

function CurrentWorkout(props) {

    const [allExerciseEls, setAllExerciseEls] = useState([])

    const currentUsersDailyExercises = props.allUserData && props.allUserData[0].workoutRoutine

    useEffect(() => {
        if (currentUsersDailyExercises) {
            const currentExerciseList = currentUsersDailyExercises.map((item,index) => {
                return (
                    <div key={index}>
                        {item}
                    </div>
                )
            })
            setAllExerciseEls(currentExerciseList)
        }
    }, [currentUsersDailyExercises])



    return (
        <main>
            <div className="workout-form-container">
                {allExerciseEls.length > 0 && allExerciseEls}
            </div>
        </main>
    )
}

export default CurrentWorkout