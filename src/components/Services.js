import React from 'react';
import './services.css'

function Services() {
  const services = [
    {
      title: 'Prescription Management',
      description: 'We manage your prescriptions efficiently, ensuring that your medications are refilled on time and available when you need them.'
    },
    {
      title: 'Home Delivery',
      description: 'Our pharmacy offers home delivery services for your convenience. Get your medications delivered right to your doorstep.'
    },
    {
      title: 'Vaccination Services',
      description: 'We provide vaccination services, including flu shots, COVID-19 vaccines, and other important immunizations to keep you healthy.'
    },
    {
      title: 'Consultation with Pharmacists',
      description: 'Speak with our licensed pharmacists to discuss your medications, dosage, and potential side effects for better management of your health.'
    },
    {
      title: 'Health Screening',
      description: 'Our health screening services include blood pressure checks, diabetes screening, and other health assessments to monitor your well-being.'
    }
  ];

  return (
    <div className="services-container">
      <h1>Pharmacy Services</h1>
      <div className="services-list">
        {services.map((service, index) => (
          <div key={index} className="service-item">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;


