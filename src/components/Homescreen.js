import starShape from '../assets/yellow_burst_shape.svg'
import PreviousWorkouts from './PreviousWorkouts'
import { Link } from 'react-router-dom'

function Homescreen() {
    return (
        <main>
            <div className='homescreen-hero-container'>
                <div className='day-container'>
                    <div className='star-text-container'>
                        <p className='star-text-day'>Day</p>
                        <p className='star-text-day-number'>55</p>
                    </div>
                </div>
                <div className='current-streak-text'>current streak: 55 days</div>
                <Link to='/current-workout'><button className='start-workout-btn'>start today's workout</button></Link>
            </div>
            
            <PreviousWorkouts />
            
        </main>
    )
}

export default Homescreen