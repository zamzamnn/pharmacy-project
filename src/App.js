import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Importing main CSS for styling
import Navbar from './components/Navbar'; // Importing the Navbar component
import Footer from './components/Footer'; // Importing the Footer component
import Login from './components/Login'; // Importing the Login component
import About from './components/About'; // Importing the About component
import Services from './components/Services'; // Importing the Services component
import Order from './components/Order'; // Importing the Order component
import Signup from './components/Signup'; // Importing the Signup component
import Home from './components/Home'; // Importing the Home component
import Admin from './components/Admin'; // Importing the Admin component

function App() {
  return (
    <Router>
      <div className="App content">
        <Navbar /> {/* Render the Navbar at the top of the app */}
        <Routes>
          {/* Define the routes for different components */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/order" element={<Order />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path='/' element={<Home />}></Route> {/* Default route to Home */}
        </Routes>
        <Footer /> {/* Render the Footer at the bottom of the app */}
      </div>
    </Router>
  );
}

export default App;
