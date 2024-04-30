import { useEffect, useState } from "react"

export default function Timer(props) {

    const [time, setTime] = useState(props.timerTime)

    useEffect(() => {
        if (time <= 0) return

        const timeInterval = setInterval(() => {
            setTime((prevTime) => prevTime - 1)
        }, 1000)

        return () => clearInterval(timeInterval)

    }, [time])

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60
        return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    return (
        <div className="timer-container">
            <div className="timer-contents">
                <div>{time > 0 ? formatTime(time) : "times up!"}</div>
                <div className='timer-back-btn' 
                    onClick={() => {
                    props.setShowTimer(false)
                }}>back</div>
            </div>
        </div>
    )
}