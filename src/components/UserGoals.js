import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from './ThemeProvider'
import BackButton from './BackButton'
import { ReactComponent as EditIcon } from '../assets/edit_icon.svg'

export default function Goals(props) {

    const { currentUserWorkoutData, retrieveData } = props

    const [editGoalseMode, setEditGoalsMode] = useState(false)

    const handleEditGoalsClick = () => {
        setEditGoalsMode(prevState => (!prevState))
    }

    const { theme } = useContext(ThemeContext)
    const themeClass = `${theme}-theme`

    return (
        <main>
            <div>
                <div className={`detail-page-icon-container ${theme}-theme`}>
                    <BackButton />
                    { currentUserWorkoutData && currentUserWorkoutData.dailyRoutine.length > 0 && !editGoalseMode ?
                        <EditIcon 
                            className={`edit-icon-symbol edit-icon-daily-routine ${themeClass}`}
                            onClick={() => setEditGoalsMode(true)}
                        /> :
                        <div onClick={() => setEditGoalsMode(false)} className='red regular default-font edit-icon-daily-routine'>cancel</div>
                    }
                </div>
            
                <div className='goals-container'>
                    <div className='goals-header'>Goals</div>
                    <p>- Reach level 300 by 3/20/25</p>
                    <p>- Go to the gym 50 times by 3/20/25</p>
                    <p>- Complete 25 sprint training sessions by 3/20/25</p>
                </div>

                {editGoalseMode && <form>
                    <label htmlFor='newGoal'>new goal:</label>
                    <input type='text' name='newGoal'></input>
                </form>}
            </div>
        </main>
    )
}