import { useEffect, useState } from 'react'

export default function UserStats(props) {

    const { currentUserWorkoutData } = props

    const [totalPushups, setTotalPushups] = useState()

    useEffect(() => {
        if (currentUserWorkoutData) {
            const totalPushups = currentUserWorkoutData.workouts.reduce((total, workout) => {
                return total + (workout['push-ups'] || 0)
            }, 0)
            console.log(totalPushups)
            setTotalPushups(totalPushups)
        }
    }, [currentUserWorkoutData])

    return (
        <main>
            <div className='stats-container'>
                <h2>Stats</h2>
                <div>total pushups: {totalPushups}</div>
            </div>
        </main>
    )
}