import { useEffect, useState } from "react"

export default function Timer(props) {

    const [time, setTime] = useState(props.timerTime)
    const [timesUp, setTimesUp] = useState(false)

    useEffect(() => {
        if (time <= 0) return

        const timeInterval = setInterval(() => {
            setTime((prevTime) => prevTime - 1)
        }, 1000)

        return () => clearInterval(timeInterval)

    }, [time])

    const formatTime = (seconds) => {
        // const hours = Math.floor(seconds / 3600)
        const minutes = Math.floor((seconds % 3600) / 60)
        const remainingSeconds = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const handleTimesUp = () => {
        setTimesUp(true)
    }

    return (
        <div className={`timer-container ${timesUp ? 'timer-container-red' : '' }`}>
            <div className="timer-contents">
                <div className="timer-time-display">{time > 0 ? formatTime(time) : timesUp ? "Time's Up" : handleTimesUp()}</div>
            </div>
            <div className="timer-btns-container">
                    <div className='timer-reset-btn' 
                        onClick={() => {
                            setTimesUp(false)
                            setTime(props.timerTime)
                    }}>reset</div>
                    <div className='timer-back-btn' 
                        onClick={() => {
                            props.setShowTimer(false)
                    }}>back</div>
                </div>
        </div>
    )
}