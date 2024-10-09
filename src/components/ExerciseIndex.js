import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import BackButton from './BackButton'
import { ThemeContext } from './ThemeProvider'
import { ReactComponent as AddIcon } from '../assets/add_button.svg'
import { ReactComponent as SearchIcon } from '../assets/search_icon.svg'
import AddExerciseToIndexModal from './AddExerciseToIndexModal'
import CategorySelect from './CategorySelect'

export default function Rules() {

    const [addExerciseMode, setAddExerciseMode] = useState(false)
    const [allExeriseIndexData, setAllExerciseIndexData] = useState([])
    const [exerciseIndexItemEls, setExerciseIndexItemEls] = useState()
    const [activeFormState, setActiveFormState] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filteredExercises, setFilteredExercises] = useState([])
    const [uniqueCategories, setUniqueCategories] = useState([])

    useEffect(() => {
        const categories = [
            ...new Set(allExeriseIndexData.map(exercise => exercise.exerciseCategory))
        ]
        setUniqueCategories(categories)
    }, [allExeriseIndexData])

    useEffect(() => {
        if (selectedCategory === 'all') {
            const groupedExercises = uniqueCategories.map(exerciseCategory => ({
                exerciseCategory,
                exercises: allExeriseIndexData.filter(
                    exercise => exercise.exerciseCategory === exerciseCategory
                )
            }))
            setFilteredExercises(groupedExercises)
        } else {
            const exercises = allExeriseIndexData.filter(
                exercise => exercise.exerciseCategory === selectedCategory
            )
            setFilteredExercises([{
                exerciseCategory: selectedCategory, 
                exercises
            }])
        }
    }, [selectedCategory, allExeriseIndexData, uniqueCategories])

    function handleCategorySelectChange(e) {
        setSelectedCategory(e.target.value)
    }

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
        if (showSuccessMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }
    }, [showSuccessMessage])

    const closeModal = (e) => {
        if (e.target === e.currentTarget) {
            setAddExerciseMode(false)
        }
    }

    const deactivateFormState = () => {
        setActiveFormState(false)
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
            <div className=''>
                <div className={`exercise-index-buttons ${themeClass}`}>
                    <BackButton />
                    <button className={`add-exercise-btn ${themeClass}`} onClick={handleAddExerciseClick}>add exercise</button>
                    <AddIcon 
                        className={`add-exercise-symbol ${themeClass}`}
                        onClick={handleAddExerciseClick} 
                    />
                </div>
                <div className={`add-exercise-success-msg-container ${showSuccessMessage && 'show'}`}>
                    <div className='add-exercise-success-msg'>{showSuccessMessage && 'Successfully Added Exercise!'}</div>
                </div>
                <div className={`add-exercise-container ${addExerciseMode && 'show'}`} style={addExerciseMode ? {} : {pointerEvents: 'none'}} onClick={activeFormState ? deactivateFormState : closeModal}>
                    {addExerciseMode && 
                        <AddExerciseToIndexModal
                            retrieveExerciseData={retrieveExerciseData}
                            closeModal={closeModal}
                            setAddExerciseMode={setAddExerciseMode}
                            activeFormState={activeFormState}
                            setActiveFormState={setActiveFormState}
                            setShowSuccessMessage={setShowSuccessMessage}
                        /> }
                </div>

                <div className={`select-search-container ${theme}-theme`}>
                    <CategorySelect 
                        uniqueCategories={uniqueCategories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        handleCategorySelectChange={handleCategorySelectChange}
                        theme={theme}
                    />
                    <SearchIcon 
                        className={`search-icon ${themeClass}`}
                    />
                </div>
                <div className='exercise-elements-container'>
                    {filteredExercises.map(group => (
                        <div key={group.exerciseCategory} className='exercise-category-group-wrapper'>
                            <div className='category-title'>{group.exerciseCategory}</div>
                            {group.exercises.map(exercise => (
                                <Link to={`${exercise._id}`} key={exercise.exerciseTitle} className='exercise-selection-container'>
                                    <div className='select-exercise-circle'></div>
                                    <div className='exercise-title'>{exercise.exerciseTitle}</div>
                                    <div className='exerise-elipses-container'>
                                        <div className='circle-one'></div>
                                        <div className='circle-two'></div>
                                        <div className='circle-three'></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}