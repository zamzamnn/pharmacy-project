// src/components/Footer.js
import React from 'react';
import './footer.css'; // Optional: for custom styling

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Pharmacy Center. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
