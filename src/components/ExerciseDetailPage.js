import { useContext, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ThemeContext } from './ThemeProvider'
import BackButton from './BackButton'
import DeleteExerciseModal from './DeleteExerciseModal'
import { ReactComponent as EditIcon } from '../assets/edit_icon.svg'
import { ReactComponent as TrashIcon } from '../assets/trash_icon.svg'

export default function ExerciseDetailPage() {

    const { id } = useParams()
    const location = useLocation()
    const allExerciseData = location.state?.allExeriseIndexData
    const { theme } = useContext(ThemeContext)
    const themeClass = `${theme}-theme`

    const [deleteExerciseMode, setDeleteExerciseMode] = useState(false)

    console.log('allExerciseData: ', allExerciseData)

    const currentExercise = allExerciseData?.find(exercise => exercise._id === id)

    console.log('currentExercise', currentExercise)

    const handleDeleteIconClick = () => {
        setDeleteExerciseMode(true)
    }

    const closeDeleteModal = (e) => {
        if (e.target === e.currentTarget) {
            setDeleteExerciseMode(false)
        }
    }
 
    if (!currentExercise) {
        return (
            <main>
                <div className='detail-page-icon-container'>
                    <BackButton />
                </div>
                <h2>Exercise not found</h2>
            </main>
        )
    }

    return (
        <main>
            <div>
                <div className={`detail-page-icon-container ${theme}-theme`}>
                    <BackButton />
                    <EditIcon 
                        className={`edit-icon-symbol ${themeClass}`}
                        
                    />
                    <TrashIcon 
                        className={`trash-symbol ${themeClass}`}
                        onClick={handleDeleteIconClick} 
                    />
                </div>
                <div className={`add-exercise-container ${deleteExerciseMode && 'show'}`} style={deleteExerciseMode ? {} : {pointerEvents: 'none'}} 
                onClick={closeDeleteModal}>
                    { deleteExerciseMode &&
                       <DeleteExerciseModal 
                            closeDeleteModal={closeDeleteModal}
                            setDeleteExerciseMode={setDeleteExerciseMode}
                            exerciseName={currentExercise.exerciseTitle}
                            currentID={id}
                       /> 
                    }
                </div>
                    
                
                <div className='exercise-detail-body-container'>
                    <div className='detail-container'>
                        <h2 className='exercise-overview-title'>{currentExercise.exerciseTitle}</h2>
                        <p className='exercise-description-text'>{currentExercise.exerciseDescription}</p>
                    </div>
                    {currentExercise.exerciseTips && <div className='tips-container'>
                        <div className='tips-title'>tips:</div>
                        <div className='tips-detail'>{currentExercise.exerciseTips}</div>
                    </div>}
                    <div className='detail-container'>
                        <h3 className='detail-title'>Your Stats</h3>
                        <p className='sign-up-text'>Sign up to start tracking your workouts</p>
                    </div>
                    <div className='detail-container'>
                        <h3 className='detail-title'>History</h3>
                        <p className='sign-up-text'>Sign up to start tracking your workouts</p>
                    </div>
                </div>
                
            </div>
        </main>
    )
}