import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Homescreen from './components/Homescreen'
import Footer from './components/Footer'
import CurrentDailyChallenge from './components/CurrentDailyChallenge'
import CurrentWorkout from './components/CurrentWorkout'
import DailyRoutine from './components/DailyRoutine'
import UserStats from './components/UserStats'
import UserSettings from './components/UserSetings'
import Goals from './components/UserGoals'
import Rules from './components/Rules'


function App() {

  const tempCurrentUserId = '665634dba3abc0522ea4aa1e'

  const [currentUserData, setCurrentUserData] = useState()
  const [currentUserWorkoutData, setCurrentUserWorkoutData] = useState()
  const [mostRecentWorkoutDate, setMostRecentWorkoutDate] = useState()
  const [userCompletedTodaysWorkout, setUserCompletedTodaysWorkout] = useState(false)
  const [mostRecentCompletedChallengeData, setMostRecentCompletedChallengeData] = useState({})
  const [userCompletedChallengeYesterday, setUserCompletedChallengeYesterday ] = useState(false)
  const [userCanContinueChallenge, setUserCanContinueChallenge] = useState(false)
  const [userIsContinuingChallenge, setUserIsContinuingChallenge] = useState(false)
  const [testUIEl, setTestUIEl] = useState('blank')

  const convertUTCDate = (date) => {
    const utcDateString = date
    const utcDate = new Date(utcDateString)
    const localDateString = utcDate.toLocaleString()
    return(localDateString)
  }

  const retrieveData = async () => {
      try {
          const userResponse = await axios.get(`https://dailyfitchallenge.com/users/${tempCurrentUserId}`)
          setCurrentUserData(userResponse.data)

          const workoutHistoryResponse = await axios.get(`https://dailyfitchallenge.com/workout-histories/${tempCurrentUserId}`)
          setCurrentUserWorkoutData(workoutHistoryResponse.data)
          console.log(workoutHistoryResponse.data)
      } catch (error) {
          console.error('Error: ', error)
      }
  }

  useEffect(() => {
    retrieveData()
    setUserIsContinuingChallenge(false)
  }, [])

  useEffect(() => {
    if (currentUserWorkoutData && currentUserWorkoutData.workouts.length > 0) {
        setMostRecentWorkoutDate(currentUserWorkoutData.workouts[0].timeStamp)
        setMostRecentCompletedChallengeData(getMostRecentCompletedWorkout(currentUserWorkoutData.workouts))
    }
  }, [currentUserWorkoutData])
  
  useEffect(() => {
    if (mostRecentCompletedChallengeData) {
      const completedYesterdaysChallenge = checkIfPreviousDay(mostRecentCompletedChallengeData.timeStamp)
      setUserCompletedChallengeYesterday(completedYesterdaysChallenge)
      console.log('completedYesterdaysChallenge ', completedYesterdaysChallenge)
    }
  }, [mostRecentCompletedChallengeData])

  useEffect(() => {
    const latestWorkoutDate = new Date(mostRecentWorkoutDate)

    const currentDate = new Date()
    const currentDayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

    const isWithinCurrentDay = latestWorkoutDate >= currentDayStart && latestWorkoutDate < currentDate

    if (isWithinCurrentDay && !currentUserWorkoutData.workouts[0].challengeComplete) {
      console.log('is within the current day and incomplete')
      setUserCanContinueChallenge(true)
      setTestUIEl('is within the current day and incomplete')
    } else if (isWithinCurrentDay && currentUserWorkoutData.workouts[0].challengeComplete) {
      console.log('is within the current day and complete')
      setTestUIEl('is within the current day and complete')
      setUserCompletedTodaysWorkout(true)
    } else {
      console.log('is not within the current day')
      setTestUIEl('is not within the current day')
    }
  }, [mostRecentWorkoutDate])
  
  const getMostRecentCompletedWorkout = (workouts) => {
    return workouts.filter(workout => workout.challengeComplete).reduce((mostRecent, current) => {
      return !mostRecent || current.timeStamp > mostRecent.timeStamp ? current : mostRecent
    }, null)
  }

  const checkIfPreviousDay = (timeStamp) => {
    const date = new Date(timeStamp)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    return date >= yesterday && date < today
  }

  return (
    <div className="App">
      <Router>
        <Header />
        <ScrollToTop />
        <div id='temp-test-id'>{testUIEl}</div>
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              tempCurrentUserId={tempCurrentUserId}
              retrieveData={retrieveData}
              currentUserData={currentUserData}
              currentUserWorkoutData={currentUserWorkoutData}
              convertUTCDate={convertUTCDate}
              userCompletedTodaysWorkout={userCompletedTodaysWorkout}
              userCanContinueChallenge={userCanContinueChallenge}
              setUserIsContinuingChallenge={setUserIsContinuingChallenge}
              mostRecentCompletedChallengeData={mostRecentCompletedChallengeData}
              userCompletedChallengeYesterday={userCompletedChallengeYesterday}
            />} />
            
            <Route exact path="/current-daily-challenge" element={
            <CurrentDailyChallenge 
              tempCurrentUserId={tempCurrentUserId}
              currentUserData={currentUserData}
              currentUserWorkoutData={currentUserWorkoutData}
              userCompletedTodaysWorkout={userCompletedTodaysWorkout}
              mostRecentCompletedChallengeData={mostRecentCompletedChallengeData}
              userCompletedChallengeYesterday={userCompletedChallengeYesterday}
              userIsContinuingChallenge={userIsContinuingChallenge}
            />} />
          <Route exact path="/current-workout" element={
            <CurrentWorkout 
              tempCurrentUserId={tempCurrentUserId}
              currentUserData={currentUserData}
              currentUserWorkoutData={currentUserWorkoutData}
              userCompletedTodaysWorkout={userCompletedTodaysWorkout}
            />} />
          <Route exact path="/daily-routine" element={
            <DailyRoutine
              tempCurrentUserId={tempCurrentUserId}
              currentUserWorkoutData={currentUserWorkoutData}
            />
          } />
          
          <Route exact path="/user-settings" element={
            <UserSettings />
          } />
          <Route exact path="/user-stats" element={
            <UserStats
              tempCurrentUserId={tempCurrentUserId}
              currentUserWorkoutData={currentUserWorkoutData}
            />
          } />
          <Route exact path="/goals" element={
            <Goals />
          } />
          <Route exact path="/user-rules" element={
            <Rules />
          } />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
