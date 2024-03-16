import axios from 'axios'
import { useEffect, useState } from 'react'

function PreviousWorkouts(props) {

    
    
    return (
        <div className="previous-workouts-container">
            <div className="previous-workouts-content">
                {props.allUserData && <div>{props.allUserData[0].username}</div>}
            </div>
            
        </div>
    )
}

export default PreviousWorkouts