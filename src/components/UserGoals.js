import { useState, useEffect } from 'react'
import { useNavigateToLink } from './ToHomeScreen'

export default function Goals() {

    const [editGoalseMode, setEditGoalsMode] = useState(false)

    const navigate = useNavigateToLink()

    const handleBackButtonClick = () => {
        navigate('/')
    }

    const handleEditGoalsClick = () => {
        setEditGoalsMode(prevState => (!prevState))
    }

    return (
        <main>
            <div className='page-margin-top'>
                <div className='back-arrow-container' onClick={handleBackButtonClick}>
                    <div className='back-arrow'></div>
                    <div className='back-arrow-tail'></div>
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
                <button className='edit-goals-btn' onClick={handleEditGoalsClick}>{editGoalseMode ? 'cancel' : 'edit'}</button>
            </div>
        </main>
    )
}