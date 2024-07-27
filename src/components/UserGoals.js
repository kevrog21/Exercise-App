import { useState, useEffect } from 'react'
import BackButton from './BackButton'

export default function Goals() {

    const [editGoalseMode, setEditGoalsMode] = useState(false)

    const handleEditGoalsClick = () => {
        setEditGoalsMode(prevState => (!prevState))
    }

    return (
        <main>
            <div className='page-margin-top'>
                <BackButton />
            
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