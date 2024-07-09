import { useState } from 'react'

export default function Rules() {

    const [addExerciseMode, setAddExerciseMode] = useState(false)

    const handleAddExerciseClick = () => {
        setAddExerciseMode(prevState => (!prevState))
    }

    return (
        <main className='page-margin-top'>
            <div className="exercise-index-section">Arm Exercises</div>
            <div className='exercise-item-container'>
                <div>Title</div>
                <div>Description</div>
            </div>
            <div className='exercise-item-container'>
                <div>Title</div>
                <div>Description</div>
            </div>
            <div className='exercise-item-container'>
                <div>Title</div>
                <div>Description</div>
            </div>
            <div className="exercise-index-section">Back Exercises</div>
            <div className='exercise-item-container'>
                <div>Title</div>
                <div>Description</div>
            </div>
            <div className='exercise-item-container'>
                <div>Title</div>
                <div>Description</div>
            </div>
            <div className='exercise-item-container'>
                <div>Title</div>
                <div>Description</div>
            </div>
            {addExerciseMode && <form>
                <label htmlFor='newExercise'>new exercise:</label>
                <input type='text' name='newExercise'></input>
            </form>}
            <button className='add-exercise-btn' onClick={handleAddExerciseClick}>{addExerciseMode ? 'cancel' : 'add exercise'}</button>
        </main>
    )
}