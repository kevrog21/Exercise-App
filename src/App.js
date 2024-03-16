import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Homescreen from './components/Homescreen'
import Footer from './components/Footer'
import CurrentWorkout from './components/CurrentWorkout'


function App() {

  const [allUserData, setAllUserData] = useState()

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:5000/users')
              setAllUserData(response.data)
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
              allUserData={allUserData}
            />} />
          <Route exact path="/current-workout" element={
            <CurrentWorkout 
              allUserData={allUserData}
            />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
