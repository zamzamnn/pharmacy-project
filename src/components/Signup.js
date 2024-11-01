// Importing React and hooks for state management and navigation
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'; // Importing CSS for styling the Signup component

function Signup() {
  // State variables to store form inputs: username, email, password, confirmPassword
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Hook for navigating to other pages (e.g., login page after signup)
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form behavior (reloading the page)

    // Check if the password and confirm password fields match
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Display an alert if passwords don't match
      return; // Stop the form submission process
    }

    // Prepare user data to be sent to the backend
    const userData = {
      username,
      email,
      password
    };

    // Attempt to send the signup request to the backend server
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST', // HTTP POST request to add new user
        headers: {
          'Content-Type': 'application/json', // Indicating the data is JSON
        },
        body: JSON.stringify(userData), // Converting user data to JSON format
      });

      // If the response is successful (status 200)
      if (response.ok) {
        const data = await response.json(); // Parse response data
        console.log('User signed up successfully:', data);

        // Redirect to the login page after 1 second, passing user data to the login page
        setTimeout(() => {
          navigate('/login', {
            state: { username: data.username, email: data.email, password: data.password }
          });
        }, 1000);
      } else {
        // If the signup request fails, handle the error
        const errorData = await response.json();
        console.error('Signup failed:', errorData); // Log the error for debugging
        alert('Signup failed. Please try again.'); // Show an alert for the user
      }
    } catch (error) {
      // If an error occurs during the fetch request, handle it here
      console.error('Error during signup:', error); // Log the error
      alert('An error occurred. Please try again later.'); // Show an alert for the user
    }
  };

  // JSX to render the signup form
  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2> {/* Title of the form */}

        {/* Username input field */}
        <div className="sign-group">
          <label htmlFor="name">Username</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUserName(e.target.value)} // Update username state when input changes
            required
          />
        </div>

        {/* Email input field */}
        <div className="sign-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state when input changes
            required
          />
        </div>

        {/* Password input field */}
        <div className="sign-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state when input changes
            required
          />
        </div>

        {/* Confirm Password input field */}
        <div className="sign-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state when input changes
            required
          />
        </div>

        {/* Signup button to submit the form */}
        <button onClick={handleSubmit} type="submit" className="signup-btn">Signup</button>
      </form>
    </div>
  );
}

export default Signup; // Exporting the Signup component so it can be used in other parts of the application
