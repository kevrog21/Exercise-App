import { useEffect, useState } from 'react'

export default function UserStats(props) {

    const { currentUserWorkoutData } = props

    // const [totalPushups, setTotalPushups] = useState()

    const [totalsEls, setTotalsEls] = useState()

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
        }
    }, [currentUserWorkoutData])

    return (
        <main>
            <div className='stats-container margin-for-header'>
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
        </main>
    )
}