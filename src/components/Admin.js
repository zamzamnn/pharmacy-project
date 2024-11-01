import React, { useState, useEffect } from 'react';
import './admin.css'; // Import the CSS for styling

function Admin() {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [selectedUser, setSelectedUser] = useState(null); // State to track the selected user for modal view
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

  // Fetch all users when the component mounts using useEffect
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users'); // Fetch user data from API
        if (!response.ok) {
          throw new Error('Failed to fetch users'); // Error handling if request fails
        }
        const data = await response.json(); // Parse the response to JSON
        setUsers(data); // Update the users state with fetched data
      } catch (error) {
        console.error('Error:', error); // Log any errors
      }
    };

    fetchUsers(); // Call the fetchUsers function
  }, []); // Empty dependency array ensures this runs once when the component loads

  // Update the delivery status for a user when selected from the dropdown
  const handleStatusChange = async (userID, status) => {
    const updatedUser = users.find((user) => user.id === userID); // Find the user whose status is being changed
    if (updatedUser) {
      updatedUser.deliveryStatus = status; // Update the user's delivery status

      try {
        const response = await fetch(`http://localhost:3000/users/${userID}`, {
          method: 'PUT', // Send a PUT request to update user
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser), // Send the updated user data as the body of the request
        });

        if (!response.ok) {
          throw new Error('Failed to update delivery status'); // Error handling if update fails
        }

        // Update the users state with the new status for the selected user
        const updatedUsers = users.map((user) =>
          user.id === userID ? { ...user, deliveryStatus: status } : user
        );
        setUsers(updatedUsers); // Set the updated list of users
        alert('Delivery status updated successfully!');
      } catch (error) {
        console.error('Error updating status:', error); // Log any errors
        alert('Failed to update delivery status'); // Alert user if update fails
      }
    }
  };

  // Delete a user order based on the userID
  const handleDelete = async (userID) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userID}`, {
        method: 'DELETE', // Send a DELETE request to remove the user
      });

      if (!response.ok) {
        throw new Error('Failed to delete user'); // Error handling if deletion fails
      }

      // Update the state to remove the deleted user from the list
      setUsers(users.filter((user) => user.id !== userID));
      alert('Order deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error); // Log any errors
      alert('Failed to delete user'); // Alert user if deletion fails
    }
  };

  // Show modal with user details when "View" button is clicked
  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user for modal view
    setShowModal(true); // Show the modal
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* Render the list of users */}
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Ordered Item: {user.orderedItem}</p>
            <p>Address: {user.address}</p>

            {/* Dropdown to select and update delivery status */}
            <div className="status-select">
              <label htmlFor={`status-${user.id}`}>Delivery Status:</label>
              <select
                id={`status-${user.id}`}
                value={user.deliveryStatus || ''}
                onChange={(e) => handleStatusChange(user.id, e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            {/* Action buttons for viewing and deleting user orders */}
            <div className="action-buttons">
              <button className="view-btn" onClick={() => handleView(user)}>
                View
              </button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for showing user details */}
      {showModal && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>Order Details</h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Order:</strong> {selectedUser.orderedItem}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <p><strong>Delivery Status:</strong> {selectedUser.deliveryStatus}</p>

            {/* Close modal button */}
            <button onClick={() => setShowModal(false)} className="close-modal">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
