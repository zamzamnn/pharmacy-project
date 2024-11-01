
import React from 'react';
import './home.css';

// src/components/Home.js

function Home() {
  // Array of patient reviews with names and review text
  const reviews = [
    { name: 'Jamac Dahir', review: 'Great service! The staff was really helpful and I got my medication on time.' },
    { name: 'Aisha Yahya', review: 'Amazing pharmacy! They offer a wide range of products and excellent customer service.' },
    { name: 'Munira Mohamed', review: 'I was impressed with the quick and efficient service. Highly recommend!' },
    { name: 'Ali Abdi', review: 'Fast delivery and excellent customer support. My go-to pharmacy!' },
    { name: 'Ibrahim Ali', review: 'Very professional and caring staff. The process was seamless.' },
    { name: 'Amina Farah', review: 'Affordable prices and fast service. I’m very satisfied with my experience.' },
  ];

  return (
    <div className="home-container">
      <h1>Welcome to Our Pharmacy</h1>
      <p>Your health is our priority. Explore our services and contact us for more information.</p>

      <div className="reviews-section">
        <h2>Patients' Reviews</h2>
        <div className="reviews-list">
          {/* Mapping over the reviews array to display each review in a separate div */}
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <strong>{review.name}:</strong>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

