import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import BackButton from './BackButton'
import { ThemeContext } from './ThemeProvider'
import AddExerciseToIndexModal from './AddExerciseToIndexModal'

export default function Rules() {

    const [addExerciseMode, setAddExerciseMode] = useState(false)
    const [allExeriseIndexData, setAllExerciseIndexData] = useState({})
    const [exerciseIndexItemEls, setExerciseIndexItemEls] = useState()

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`

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
                <div className='exercise-index-buttons'>
                    <BackButton />
                    <button className={`add-exercise-btn ${themeClass}`} onClick={handleAddExerciseClick}>{addExerciseMode ? 'cancel' : 'add exercise'}</button>
                    <button className={`add-exercise-symbol ${themeClass}`} onClick={handleAddExerciseClick}>+</button>
                </div>
                {addExerciseMode ? 
                    <form className='add-exercise-form'>
                        <AddExerciseToIndexModal
                            setAddExerciseMode={setAddExerciseMode}
                        />
                    </form> : 
                    <div className='add-exercise-form-placeholder'></div>}
                {exerciseIndexItemEls}
            </div>
        </main>
    )
}