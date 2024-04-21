import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Homescreen from './components/Homescreen'
import Footer from './components/Footer'
import CurrentWorkout from './components/CurrentWorkout'
import DailyRoutine from './components/DailyRoutine'
import UserStats from './components/UserStats'
import UserSettings from './components/UserSetings'
import Goals from './components/UserGoals'


function App() {

  const tempCurrentUserId = '65fb5f4e83e845c2b098f860'

  const [currentUserData, setCurrentUserData] = useState()
  const [currentUserWorkoutData, setCurrentUserWorkoutData] = useState()
  const [mostRecentWorkoutDate, setMostRecentWorkoutDate] = useState()
  const [userCompletedTodaysWorkout, setUserCompletedTodaysWorkout] = useState(false)


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
  }, [])

  useEffect(() => {
    if (currentUserWorkoutData && currentUserWorkoutData.workouts.length > 0) {
        setMostRecentWorkoutDate(currentUserWorkoutData.workouts[0].timeStamp)
    }
  }, [currentUserWorkoutData])

  useEffect(() => {
    const latestWorkoutDate = new Date(mostRecentWorkoutDate)

    const currentDate = new Date()
    const currentDayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

    const isWithinCurrentDay = latestWorkoutDate >= currentDayStart && latestWorkoutDate < currentDate

    if (isWithinCurrentDay) {
        console.log('is within the current day')
        setUserCompletedTodaysWorkout(true)
    } else {
        console.log('is not within the current day')
    }
  }, [mostRecentWorkoutDate])


  return (
    <div className="App">
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              tempCurrentUserId={tempCurrentUserId}
              retrieveData={retrieveData}
              currentUserData={currentUserData}
              currentUserWorkoutData={currentUserWorkoutData}
              convertUTCDate={convertUTCDate}
              userCompletedTodaysWorkout={userCompletedTodaysWorkout}
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

        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
