import React from 'react';
import './ContactUsLayout.css';
import ContactUsSection from './ContactUsSection';
import ContactFormSection from './ContactFormSection';

const ContactUsLayout: React.FC = () => {
  return (
    <div className="contact-us-layout">
      <div className="contact-us-section">
        <ContactUsSection />
      </div>
      <div className="contact-form-section">
        <ContactFormSection />
      </div>
    </div>
  );
};

export default ContactUsLayout;
