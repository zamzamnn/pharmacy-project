import React, { useState } from 'react';
import './order.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Order() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract user details from location.state (passed from a previous component)
  const { userID, username, email, password } = location.state || {};

  // Define state variables for form input fields
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [orderedItem, setOrderedItem] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');

  // Handle form submission and order update
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    // Check if userID exists, otherwise show an alert
    if (!userID) {
      alert('User ID is missing. Cannot update the order.');
      return;
    }

    // Collect all form data and user details to be sent to the server
    const orderData = {
      name,
      date,
      time,
      service,
      orderedItem,
      address,
      deliveryStatus,
      username,   // Include signup details in the order data
      email,
      password
    };

    try {
      // Send a PUT request to update the order for the specific user
      const response = await fetch(`http://localhost:3000/users/${userID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData), // Convert orderData object to JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Order updated successfully:', data);

        // Clear form inputs after successful submission
        setName('');
        setDate('');
        setTime('');
        setService('');
        setOrderedItem('');
        setAddress('');
        setDeliveryStatus('');

        alert('Order updated successfully!');
      } else {
        const errorData = await response.json();
        console.error('Order update failed:', errorData);
        alert('Order update failed. Please try again.');
      }
    } catch (error) {
      // Handle any errors that occur during the fetch request
      console.error('Error updating order:', error);
      alert('There was an error updating your order. Please try again.');
    }
  };

  return (
    <div className="order-container">
      <h1>Place Order</h1>
      <form className="order-form" onSubmit={handleSubmit}>
        {/* Full Name input */}
        <div className="order-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Doctor selection */}
        <div className="order-group">
          <label htmlFor="service">Served By</label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Select Doctor</option>
            <option value="Dr. Yussuf">Dr. Yussuf</option>
            <option value="Dr. ZamZam">Dr. ZamZam</option>
            <option value="Dr. Abdi">Dr. Abdi</option>
            <option value="Dr. Ahmed">Dr. Ahmed</option>
            <option value="Dr. Ibrahim">Dr. Ibrahim</option>
          </select>
        </div>

        {/* Date of Order input */}
        <div className="order-group">
          <label htmlFor="date">Date of Order</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Time of Order input */}
        <div className="order-group">
          <label htmlFor="time">Time of Order</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        {/* Ordered Item input */}
        <div className="order-group">
          <label htmlFor="orderedItem">Ordered Item</label>
          <input
            type="text"
            id="orderedItem"
            value={orderedItem}
            onChange={(e) => setOrderedItem(e.target.value)}
            required
          />
        </div>

        {/* Delivery Address input */}
        <div className="order-group">
          <label htmlFor="address">Delivery Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="submit-btn">Update Order</button>
      </form>
    </div>
  );
}

export default Order;
