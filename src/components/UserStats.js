import { useEffect, useState } from 'react'
import { useNavigateToLink } from './ToHomeScreen'

export default function UserStats(props) {
    const navigate = useNavigateToLink()
    const { currentUserWorkoutData } = props

    // const [totalPushups, setTotalPushups] = useState()

    const [totalsEls, setTotalsEls] = useState()
    const [displayDaysRemaining, setDisplayDaysRemaining] = useState(0)
    const [completedChallenges, setCompletedChallenges] = useState()

    useEffect(() => {
        if (currentUserWorkoutData) {
            const totals = currentUserWorkoutData.workouts.reduce((total, workout) => {

                Object.keys(workout).forEach(exerciseName => {
                    const value = workout[exerciseName].count !== undefined
                        ? workout[exerciseName].count
                        : workout[exerciseName]

                    if (exerciseName !== 'timeStamp' && exerciseName !== 'challengeComplete' && exerciseName !== 'challengeNumber' && !isNaN(value)) {
                        total[exerciseName] = (total[exerciseName] || 0) + Number(value)
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

            const parsedStartDate = currentUserWorkoutData.workouts[0].timeStamp < currentUserWorkoutData.workouts[1].timeStamp
                ? new Date(currentUserWorkoutData.workouts[0].timeStamp)
                : new Date(currentUserWorkoutData.workouts[currentUserWorkoutData.workouts.length - 1].timeStamp)
            const endDate = new Date(parsedStartDate)
            endDate.setDate(endDate.getDate() + 365)
            const currentDate = new Date()
            currentDate.setHours(0, 0, 0, 0)
            endDate.setHours(0, 0, 0, 0)
            const dateDifference = endDate.getTime() - currentDate.getTime()
            const daysRemaining = Math.ceil(dateDifference / (1000 * 60 * 60 * 24))
            setDisplayDaysRemaining(daysRemaining >= 0 ? daysRemaining : 0)

            const completedCount = currentUserWorkoutData.workouts.reduce((count, workout) => {
                if (workout.challengeComplete === undefined || workout.challengeComplete) {
                    return count + 1
                }
                return count
            }, 0)
            setCompletedChallenges(completedCount)
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
                    <div>Daily Challenges Completed: {completedChallenges}</div>
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
                    <div>Challenges Completed: {completedChallenges}</div>
                    <div>Challenges Remaining: {currentUserWorkoutData && (300 - completedChallenges)}</div>
                    <div>Days Remaining: {currentUserWorkoutData && displayDaysRemaining}</div>
                    <div>Rest Days Taken: {currentUserWorkoutData && ((365 - displayDaysRemaining) - completedChallenges)}</div>
                    <div>Rest Days Remaining: {currentUserWorkoutData && (displayDaysRemaining - (300 - completedChallenges))}</div>
                </div>
            </div>
        </main>
    )
}