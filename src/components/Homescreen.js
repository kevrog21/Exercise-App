import starShape from '../assets/yellow_burst_shape.svg'
import PreviousWorkouts from './PreviousWorkouts'
import { Link } from 'react-router-dom'

function Homescreen(props) {

    return (
        <main>
            <div className='homescreen-hero-container'>
                <div className='day-container'>
                    <div className='star-text-container'>
                        <p className='star-text-day'>Day</p>
                        <p className='star-text-day-number'>{props.currentUserWorkoutData ? props.currentUserWorkoutData.workouts.length + 1 : ''}</p>
                    </div>
                </div>
                <div className='current-streak-text'>current streak: {props.currentUserWorkoutData ? props.currentUserWorkoutData.workouts.length : ''} days</div>
                <Link to='/current-workout'><button className='start-workout-btn'>start today's workout</button></Link>
            </div>
            
            <PreviousWorkouts 
                tempCurrentUserId={props.tempCurrentUserId}
                currentUserData={props.currentUserData}
                currentUserWorkoutData={props.currentUserWorkoutData}
            />
            
        </main>
    )
}

export default Homescreen