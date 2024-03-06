import starShape from '../assets/yellow_burst_shape.svg'

function Homescreen() {
    return (
        <main>
            <div className='day-container'>
                <div className='star-text-container'>
                    <p className='star-text-day'>Day</p>
                    <p className='star-text-day-number'>55</p>
                </div>
                <div>current streak: 55 days</div>
                <button>start today's workout</button>
            </div>
            
        </main>
    )
}

export default Homescreen