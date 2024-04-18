import { useEffect, useState } from 'react'

export default function UserStats(props) {

    const { currentUserWorkoutData } = props

    // const [totalPushups, setTotalPushups] = useState()

    const [totalsEls, setTotalsEls] = useState()

    useEffect(() => {
        if (currentUserWorkoutData) {
            const totals = currentUserWorkoutData.workouts.reduce((total, workout) => {
                Object.keys(workout).forEach(exerciseName => {
                    if (exerciseName !== 'timeStamp') {
                        total[exerciseName] = (total[exerciseName] || 0) + workout[exerciseName]
                    }
                })
                return total
            }, {})

            const totalsElements = Object.keys(totals).map(exerciseName => (
                <div key={exerciseName}>{exerciseName}: {totals[exerciseName]}</div>
            ))

            setTotalsEls(totalsElements)
        }
    }, [currentUserWorkoutData])

    return (
        <main>
            <div className='stats-container'>
                <h2>Stats</h2>
                {/* <div>total pushups: {totalPushups}</div> */}
                {totalsEls}
            </div>
        </main>
    )
}