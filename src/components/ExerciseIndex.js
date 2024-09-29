import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import BackButton from './BackButton'
import { ThemeContext } from './ThemeProvider'
import AddExerciseToIndexModal from './AddExerciseToIndexModal'

export default function Rules() {

    const [addExerciseMode, setAddExerciseMode] = useState(false)
    const [allExeriseIndexData, setAllExerciseIndexData] = useState({})
    const [exerciseIndexItemEls, setExerciseIndexItemEls] = useState()
    const [activeFormState, setActiveFormState] = useState(false)

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

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setAddExerciseMode(false)
        }
    }

    const deactivateFormState = () => {
        setActiveFormState(false)
        console.log('deactivating form state')
    }

    function disableBackgroundScroll() {
        const bodyEl = document.querySelector('body')

        if (addExerciseMode) {
            bodyEl.classList.add('no-scroll')
            
        } else {
            bodyEl.classList.remove('no-scroll')
        }
    }

    useEffect(() => {
        disableBackgroundScroll()
    }, [addExerciseMode])

    return (
        <main>
            <div className='page-margin-top'>
                <div className='exercise-index-buttons'>
                    <BackButton />
                    <button className={`add-exercise-btn ${themeClass}`} onClick={handleAddExerciseClick}>add exercise</button>
                    <button className={`add-exercise-symbol ${themeClass}`} onClick={handleAddExerciseClick}>+</button>
                </div>
                <div className={`add-exercise-container ${addExerciseMode && 'show'}`} style={addExerciseMode ? {} : {pointerEvents: 'none'}} onClick={activeFormState ? deactivateFormState : closeModal}>
                    {addExerciseMode && 
                        <AddExerciseToIndexModal
                            closeModal={closeModal}
                            setAddExerciseMode={setAddExerciseMode}
                            activeFormState={activeFormState}
                            setActiveFormState={setActiveFormState}
                        /> }
                </div>
                <div>
                    {exerciseIndexItemEls}
                </div>
            </div>
        </main>
    )
}