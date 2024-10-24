import { useState, useEffect, useContext, useRef } from 'react'
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
    const [showSuccessfulDeletion, setShowSuccessfulDeletion] = useState(false)
    const [activeSearchBox, setActiveSearchBox] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [searchIsCickable, setSearchIsClickable] = useState(true)
    const [showUpdatedResultsVisual, setShowUpdatedResultsVisual] = useState(false)

    const [selectedCategory, setSelectedCategory] = useState('all')
    const [filteredExercises, setFilteredExercises] = useState([])
    const [uniqueCategories, setUniqueCategories] = useState([])

    const isFirstRender = useRef(true)
    const allowUpdate = useRef(false)
    const initialTimeout = useRef(null)
    const searchInputRef = useRef(null)

    useEffect(() => {
        initialTimeout.current = setTimeout(() => {
            allowUpdate.current = true
        }, 1000)

        return () => clearTimeout(initialTimeout.current)
    }, [])

    useEffect(() => {
        const categories = [
            ...new Set(allExeriseIndexData.map(exercise => exercise.exerciseCategory))
        ]
        setUniqueCategories(categories)
    }, [allExeriseIndexData])

    useEffect(() => {
        if (selectedCategory === 'all') {
            const groupedExercises = uniqueCategories.map(exerciseCategory => {
                const exercises = allExeriseIndexData.filter(
                    exercise => exercise.exerciseCategory === exerciseCategory
                ).filter(exercise => 
                (exercise.exerciseTitle?.toLowerCase().includes(searchTerm.toLowerCase()))
                )

                return {
                    exerciseCategory,
                    exercises
                }
            }).filter(grouping => grouping.exercises.length > 0)
            
            setFilteredExercises(groupedExercises)
        } else {
            const exercises = allExeriseIndexData.filter(
                exercise => exercise.exerciseCategory === selectedCategory
            ).filter(exercise => 
                exercise.exerciseTitle?.toLowerCase().includes(searchTerm.toLowerCase()))
            setFilteredExercises([{
                exerciseCategory: selectedCategory, 
                exercises
            }])
        }
    }, [selectedCategory, allExeriseIndexData, uniqueCategories, searchTerm])

    const { theme } = useContext(ThemeContext)

    const themeClass = `${theme}-theme`

    const handleAddExerciseClick = () => {
        setAddExerciseMode(prevState => (!prevState))
    }

    const retrieveExerciseData = async () => {
        console.log('making request to get exercise index')
        try {
            const allExerciseIndexDataResponse = await axios.get(`https://dailyfitchallenge.com/exercise-index-data`)
            setAllExerciseIndexData(allExerciseIndexDataResponse.data)
            localStorage.setItem('allExerciseIndexLocalStorage', JSON.stringify(allExerciseIndexDataResponse.data))
        } catch (error) {
          console.error('Error: ', error)
      }
    }

    useEffect(() => {
        const shouldRefresh = localStorage.getItem('refreshIndexData')
        const localStorageExerciseIndexData = localStorage.getItem('allExerciseIndexLocalStorage')
        const parsedExerciseIndexData = localStorageExerciseIndexData ? JSON.parse(localStorageExerciseIndexData) : null
        if (!parsedExerciseIndexData || shouldRefresh) {
            retrieveExerciseData()
            localStorage.removeItem('refreshIndexData')
            setShowSuccessfulDeletion(true)
        } else {
            setAllExerciseIndexData(parsedExerciseIndexData)
        }
        console.log('current storage', parsedExerciseIndexData)
        const savedCategory = localStorage.getItem('selectedCategory')
        if (savedCategory) {
            setSelectedCategory(savedCategory)
        }
    }, [])

    useEffect(() => {
        if (showSuccessMessage) {
            setTimeout(() => {
                setShowSuccessMessage(false)
            }, 3000)
        }
    }, [showSuccessMessage])

    useEffect(() => {
        if (showSuccessfulDeletion) {
            setTimeout(() => {
                setShowSuccessfulDeletion(false)
            }, 3000)
        }
    }, [showSuccessfulDeletion])

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

    const handleSearchClick = () => {

        if (searchIsCickable) {
            setSearchIsClickable(false)
            if (searchInputRef.current && !activeSearchBox) {
                setTimeout(() => {
                    searchInputRef.current.focus()
                }, 300)
            }
            setActiveSearchBox(prevState => (!prevState))
            setTimeout(() => {
                setSearchIsClickable(true)
            }, 300)
        }
    }

    

    useEffect(() => {

        if (isFirstRender.current || !allowUpdate.current) {
            isFirstRender.current = false
            return
        }

        const restartAnimation = () => {
            setShowUpdatedResultsVisual(false)
            setTimeout(() => {
                setShowUpdatedResultsVisual(true)
            }, 0)
        }
        
        restartAnimation()

        const timeout = setTimeout(() => {
            setShowUpdatedResultsVisual(false)
        }, 1500)

        return () => clearTimeout(timeout)
        
    }, [filteredExercises])

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
                <div className={`add-exercise-success-msg-container ${showSuccessMessage && 'show' || showSuccessfulDeletion && 'show'}`}>
                    <div className='add-exercise-success-msg'>{showSuccessMessage && 'Successfully Added Exercise!'}{showSuccessfulDeletion && 'Exercise Deleted!'}</div>
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
                        theme={theme}
                    />
                    
                    <div className='search-elements-container'>
                        <div className='search-box-container'>
                            <input className={`search-box ${activeSearchBox ? 'show' : ''}`} type='text' placeholder='search...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} ref={searchInputRef}></input>
                            <AddIcon 
                                className={`clear-search-icon ${searchTerm && activeSearchBox ? 'show' : ''}`}
                                onClick={() => setSearchTerm('')}
                            />
                            <SearchIcon 
                                className={`search-icon ${themeClass} ${activeSearchBox ? 'show' : ''}`}
                                onClick={handleSearchClick}
                            />
                        </div>
                        

                    </div>
                </div>
                <div className={`exercise-elements-container ${showUpdatedResultsVisual ? 'update-visual' : ''}`}>
                    {filteredExercises.length === 0 ? (
                        <div className='no-results-msg'>no exercises found</div>
                    ) : (
                        filteredExercises.map(group => (
                            <div key={group.exerciseCategory} className='exercise-category-group-wrapper'>
                                <div className='category-title'>{group.exerciseCategory}</div>
                                {group.exercises.map(exercise => (
                                    <Link to={`${exercise._id}`} state={
                                        {
                                            allExeriseIndexData: allExeriseIndexData
                                        }
                                    } key={exercise.exerciseTitle} className='exercise-selection-container'>
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
                        ))
                    )}
                </div>
                <div onClick={retrieveExerciseData}>refresh</div>
            </div>
        </main>
    )
}