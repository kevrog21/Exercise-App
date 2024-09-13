import { useState, useEffect } from 'react'
import BackButton from './BackButton'
import axios from 'axios'

export default function Rules() {

    const [addExerciseMode, setAddExerciseMode] = useState(false)
    const [allExeriseIndexData, setAllExerciseIndexData] = useState({})
    const [exerciseIndexItemEls, setExerciseIndexItemEls] = useState()

    const handleAddExerciseClick = () => {
        setAddExerciseMode(prevState => (!prevState))
    }

    const retrieveExerciseData = async () => {
        try {
            const allExerciseIndexDataResponse = await axios.get(`https://dailyfitchallenge.com/exercise-index-data`)
            setAllExerciseIndexData(allExerciseIndexDataResponse.data)
        } catch (error) {
          console.error('Error: ', error)
      }
    }

    useEffect(() => {
        retrieveExerciseData()
    }, [])

    useEffect(() => {
        if (allExeriseIndexData.length > 0) {
            console.log('index data: ', allExeriseIndexData)

            const exerciseIndexItems = allExeriseIndexData.map((exercise, index) => {
                return (
                    <div key={index}>
                        {exercise.exerciseTitle}
                    </div>
                )
            })
            setExerciseIndexItemEls(exerciseIndexItems)
        }
    }, [allExeriseIndexData])

    return (
        <main>
            <div className='page-margin-top'>
                <BackButton />
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
                {exerciseIndexItemEls}
            </div>
        </main>
    )
}