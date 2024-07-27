import { useState, useEffect } from 'react'
import BackButton from './BackButton'

export default function Rules() {

    const [editRulesMode, setEditRulesMode] = useState(false)

    const handleEditRulesClick = () => {
        setEditRulesMode(prevState => (!prevState))
    }

    return (
        <main>
            <div className='page-margin-top'>
                <BackButton />
                <div className='rules-container'>
                    <div className='rules-header'>Rules</div>
                    <p>- A daily challenge must be completed within the calendar day that it is started in order to advance to the next challenge.</p>
                    <p>- A challenge can be started and revisited as many times throughout the day, as long as it is completed before midnight.</p>
                    <p>- After completion of a challenge, the user cannot start the next challenge until the following calendar day.</p>
                    <p>- The increase in repetitions/duration between each challenge is determined by the user when setting their daily routine.</p>
                </div>
                {editRulesMode && <form>
                    <label htmlFor='newRule'>new rule:</label>
                    <input type='text' name='newRule'></input>
                </form>}
                <button className='edit-goals-btn' onClick={handleEditRulesClick}>{editRulesMode ? 'cancel' : 'edit'}</button>
            </div>
        </main>
    )
}