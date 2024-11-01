// Importing necessary modules and hooks from React and React Router
import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks for navigation and accessing location state
import './login.css'; // Importing CSS file for styling

// Defining the Login functional component
function Login() {
  // State to store the username input
  const [username, setUsername] = useState(''); 

  // State to store the password input
  const [password, setPassword] = useState('');

  // State to store the list of users fetched from the backend
  const [users, setUsers] = useState([]);

  // useNavigate hook for redirecting the user to a different route (e.g., order page)
  const navigate = useNavigate(); 

  // useLocation hook to access any state passed from the previous route (e.g., from signup)
  const location = useLocation(); 

  // useEffect hook to fetch users from the backend when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetching users from the backend (assuming it's running on localhost:3000)
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) { // Check if the response is not OK (status code not in the 200-299 range)
          throw new Error('Failed to fetch users'); // Throw an error if the request fails
        }
        const usersData = await response.json(); // Parse the response as JSON
        setUsers(usersData); // Store the fetched users in the state
      } catch (error) {
        console.log('Error:', error); // Log any errors during the fetch request
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []); // Empty dependency array ensures this effect runs only once (when the component mounts)

  // Another useEffect hook to autofill username and password if passed from the Signup component
  useEffect(() => {
    if (location.state) { // Check if there's any state passed from the previous route (e.g., Signup)
      const { username, password } = location.state; // Destructure username and password from location.state
      setUsername(username || ''); // Set the username state (default to empty if undefined)
      setPassword(password || ''); // Set the password state (default to empty if undefined)
    }
  }, [location.state]); // This effect will re-run when location.state changes

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    // Find a user from the users array whose username and password match the input values
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      // If a matching user is found, navigate to the order page and pass user details via location.state
      navigate('/order', {
        state: { userID: user.id, username: user.username, email: user.email, password: user.password }
      });
    } else {
      // If no matching user is found, show an alert for login failure
      alert('Login failed! Incorrect username or password.');
    }
  };

  // JSX to render the login form
  return (
    <div className="login-container"> {/* Main container div for the login form */}
      <form className="login-form" onSubmit={handleSubmit}> {/* Form element with onSubmit handler */}
        <h2>Login</h2> {/* Form title */}

        {/* Username input field */}
        <div className="login-group">
          <label htmlFor="email">Username:</label> {/* Label for the username input */}
          <input
            type="username"
            id="username"
            value={username} // Controlled input linked to the username state
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            required // Mark input as required
          />
        </div>

        {/* Password input field */}
        <div className="login-group">
          <label htmlFor="password">Password:</label> {/* Label for the password input */}
          <input
            type="password"
            id="password"
            value={password} // Controlled input linked to the password state
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required // Mark input as required
          />
        </div>

        {/* Submit button to trigger the form submission */}
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
}

export default Login; // Exporting the Login component so it can be used in other parts of the application
