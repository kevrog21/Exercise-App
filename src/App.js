import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header';
import Homescreen from './components/Homescreen'
import Footer from './components/Footer'


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={
            <Homescreen 
              
            />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
