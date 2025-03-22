import { useEffect, useState } from "react"

export default function Timer(props) {

    const [time, setTime] = useState(props.timerTime)
    const [timesUp, setTimesUp] = useState(false)
    const [timerIsPaused, setTimerIsPaused] = useState(false)

    const {markComplete, saveTimerProgress, timerExerciseName} = props

    useEffect(() => {
        if (time <= 0) return

        const timeInterval = setInterval(() => {
            if (!timerIsPaused) {
                setTime((prevTime) => prevTime - 1)
            } 
        }, 1000)

        return () => clearInterval(timeInterval)

    }, [time, timerIsPaused])

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
        <div className={`timer-container ${timesUp && 'timer-container-red'} ${timerIsPaused && 'timer-container-gray'}`}>
            {timerIsPaused && <div className='paused-label'>paused</div>}
            <div className="timer-contents">
                <div className={`timer-time-display ${timerIsPaused && 'timer-time-display-paused'}`}>{time > 0 ? formatTime(time) : timesUp ? "Time's Up" : handleTimesUp()}</div>
            </div>
            <div className={`timer-btns-container ${timesUp ? '' : 'complete-btn-placeholder'}`}>
                <div className={`timer-reset-btn ${timesUp ? 'white-btn' : ''}`}
                    onClick={() => {
                        setTimesUp(false)
                        setTimerIsPaused(false)
                        setTime(props.timerTime)
                }}>reset</div>
                <div className={`timer-back-btn ${timesUp ? 'white-btn' : ''}`}
                    onClick={() => {
                        props.setShowTimer(false)
                }}>{timesUp ? 'back' : 'cancel'}</div>
                {!timesUp && !timerIsPaused && <div className='timer-mark-complete' onClick={() => setTimerIsPaused(true)}>take a break</div>}
                {!timesUp && timerIsPaused && <div className='timer-mark-complete' onClick={() => setTimerIsPaused(false)}>resume</div>}
                {timerIsPaused && <div className='timer-mark-complete' onClick={() => saveTimerProgress(timerExerciseName, time)}>save & come back later</div>}
                {timesUp && <div className='timer-mark-complete' onClick={() => markComplete(timerExerciseName)}>✓ mark complete</div>}
            </div>
        </div>
    )
}