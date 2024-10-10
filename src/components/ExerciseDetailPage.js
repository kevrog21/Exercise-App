import { useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { ThemeContext } from './ThemeProvider'
import BackButton from './BackButton'
import { ReactComponent as EditIcon } from '../assets/edit_icon.svg'
import { ReactComponent as TrashIcon } from '../assets/trash_icon.svg'

export default function ExerciseDetailPage() {

    const { id } = useParams()
    const location = useLocation()
    const allExerciseData = location.state?.allExeriseIndexData
    const { theme } = useContext(ThemeContext)
    const themeClass = `${theme}-theme`

    console.log('allExerciseData: ', allExerciseData)

    const currentExercise = allExerciseData?.find(exercise => exercise._id === id)

    console.log('currentExercise', currentExercise)

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
                        onClick={() => {}} 
                    />
                    <TrashIcon 
                        className={`trash-symbol ${themeClass}`}
                        onClick={() => {}} 
                    />
                </div>
                <div className='exercise-detail-body-container'>
                    <div className='detail-container'>
                        <h2 className='exercise-overview-title'>{currentExercise.exerciseTitle}</h2>
                        <p className='exercise-description-text'>{currentExercise.exerciseDescription}</p>
                    </div>
                    {currentExercise.tips && <div className='tips-container'>
                        <div className='tips-title'>tips:</div>
                        <div className='tips-detail'>{currentExercise.tips}</div>
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