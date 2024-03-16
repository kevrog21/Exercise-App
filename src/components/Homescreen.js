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
                        <p className='star-text-day-number'>{props.allUserData ? props.allUserData.length : ''}</p>
                    </div>
                </div>
                <div className='current-streak-text'>current streak: {props.allUserData ? props.allUserData.length : ''} days</div>
                <Link to='/current-workout'><button className='start-workout-btn'>start today's workout</button></Link>
            </div>
            
            <PreviousWorkouts 
                allUserData={props.allUserData}
            />
            
        </main>
    )
}

export default Homescreen