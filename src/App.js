import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Property from './Components/Property/Property'
import PropertyDetail from './Components/Property/PropertyDetail'
import Nav from './Components/Navbar'
import './App.css';

function App() {
  
  return (
    <div className ="App">
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Login/>} />
          <Route path="/property" element={<Property/>} />
          <Route path="/property/:id" element={<PropertyDetail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
