import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the current path is '/admin', and conditionally render links based on that
  const isAdminRoute = location.pathname === '/admin';

  // Handle the logout functionality
  const handleLogout = () => {
    // Clear the location.state to remove user session info and redirect to login
    navigate('/login', { state: null });
  };

  return (
    <header className="header">
      <nav>
        <h1>Pharmacy Center</h1>
        <ul>
          {/* Only render the main navigation links if not on the admin route */}
          {!isAdminRoute && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
              <li><Link to="/order">Place an Order</Link></li>
              {/* Conditionally render the Logout button if the user is logged in */}
              {location.state && location.state.userID && (
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
