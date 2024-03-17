import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Homescreen from './components/Homescreen'
import Footer from './components/Footer'
import CurrentWorkout from './components/CurrentWorkout'


function App() {

  const tempCurrentUserId = '65f612312938b12856048c79'

  const [currentUserData, setCurrentUserData] = useState()
  const [currentUserWorkoutData, setCurrentUserWorkoutData] = useState()

  useEffect(() => {
      const fetchData = async () => {
          try {
              const userResponse = await axios.get(`http://localhost:5000/users/${tempCurrentUserId}`)
              setCurrentUserData(userResponse.data)

              const workoutHistoryResponse = await axios.get(`http://localhost:5000/workout-histories/${tempCurrentUserId}`)
              setCurrentUserWorkoutData(workoutHistoryResponse.data)
              console.log(workoutHistoryResponse.data)
          } catch (error) {
              console.error('Error: ', error)
          }
      }

      fetchData()
  }, [])
  
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              tempCurrentUserId={tempCurrentUserId}
              currentUserData={currentUserData}
              currentUserWorkoutData={currentUserWorkoutData}
            />} />
          <Route exact path="/current-workout" element={
            <CurrentWorkout 
              tempCurrentUserId={tempCurrentUserId}
              currentUserData={currentUserData}
              currentUserWorkoutData={currentUserWorkoutData}
            />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
