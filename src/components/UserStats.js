import { useEffect, useState } from 'react'
import { useNavigateToLink } from './ToHomeScreen'

export default function UserStats(props) {
    const navigate = useNavigateToLink()
    const { currentUserWorkoutData } = props

    // const [totalPushups, setTotalPushups] = useState()

    const [totalsEls, setTotalsEls] = useState()
    const [displayDaysRemaining, setDisplayDaysRemaining] = useState()

    useEffect(() => {
        if (currentUserWorkoutData) {
            const totals = currentUserWorkoutData.workouts.reduce((total, workout) => {
                Object.keys(workout).forEach(exerciseName => {
                    if (workout[exerciseName].count) {
                        total[exerciseName] = (total[exerciseName] || 0) + workout[exerciseName].count
                    } else if (exerciseName !== 'timeStamp' && exerciseName !== 'challengeComplete' && exerciseName !== 'challengeNumber') {
                        total[exerciseName] = (total[exerciseName] || 0) + workout[exerciseName]
                    }
                })
                return total
            }, {})

            const totalsElements = Object.keys(totals).map(exerciseName => {
                const unit = currentUserWorkoutData.dailyRoutine.find(item => item.exerciseName === exerciseName)?.unit
                return (
                    <div key={exerciseName}>
                        {exerciseName}: {totals[exerciseName]} {unit}
                    </div>
                )
            })

            setTotalsEls(totalsElements)

            const parsedStartDate = new Date(currentUserWorkoutData.workouts[0].timeStamp)
            const endDate = new Date(parsedStartDate)
            endDate.setDate(endDate.getDate() + 365)
            const currentDate = new Date()
            currentDate.setHours(0, 0, 0, 0)
            endDate.setHours(0, 0, 0, 0)
            const dateDifference = endDate.getTime() - currentDate.getTime()
            const daysRemaining = Math.ceil(dateDifference / (1000 * 60 * 60 * 24))
            setDisplayDaysRemaining(daysRemaining >= 0 ? daysRemaining : 0)
        }
    }, [currentUserWorkoutData])

    const handleBackButtonClick = () => {
        navigate('/')
    }

    return (
        <main>
            <div className='page-margin-top'>
                <div className='back-arrow-container' onClick={handleBackButtonClick}>
                    <div className='back-arrow'></div>
                    <div className='back-arrow-tail'></div>
                </div>
                <div className='stats-container'>
                    <h2>General Totals</h2>
                    <div>Trips to the gym: </div>
                    <div>Sprint Training Sessions: </div>
                    <div>Daily Challenges Completed: {currentUserWorkoutData && currentUserWorkoutData.workouts.length}</div>
                </div>
                <div className='stats-container'>
                    <h2>Daily Challenge Totals</h2>
                    {/* <div>total pushups: {totalPushups}</div> */}
                    {totalsEls}
                </div>
                <div className='stats-container'>
                    <h2>Workout Stats</h2>
                    <div>Unique exercises completed: </div>
                    <div>Bench Press PR: </div>
                    <div>Squat PR: </div>
                    <div>Pull-up PR: </div>
                    <div>Plank PR: </div>
                </div>
                <div className='stats-container'>
                    <h2>Progress Stats</h2>
                    <div>Challenges Completed: {currentUserWorkoutData && currentUserWorkoutData.workouts.length}</div>
                    <div>Challenges Remaining: {currentUserWorkoutData && (300 - currentUserWorkoutData.workouts.length)}</div>
                    <div>Days Remaining: {displayDaysRemaining}</div>
                    <div>Days Missed: {currentUserWorkoutData && ((365 - displayDaysRemaining) - currentUserWorkoutData.workouts.length)}</div>
                    <div>Days Left You Can Miss: {currentUserWorkoutData && (displayDaysRemaining - (300 - currentUserWorkoutData.workouts.length))}</div>
                </div>
            </div>
        </main>
    )
}