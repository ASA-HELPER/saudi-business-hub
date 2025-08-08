import React from 'react';
import './ContactUsSection.css';

const ContactUsSection: React.FC = () => {
  return (
    <div className="contact-us-container">
      <h1 className="contact-title">Contact Us</h1>
      
      <div className="contact-items">
        <div className="contact-item">
          <div className="contact-content">
            <div className="icon-container">
              <img src="https://dashboard.codeparrot.ai/api/image/aFUoyDvVbr2-V93y/call-cal.png" alt="Local Phone" />
            </div>
            <div className="contact-details">
              <p className="label">Local Phone Number</p>
              <p className="value">8002449990</p>
            </div>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-content">
            <div className="icon-container">
              <img src="https://dashboard.codeparrot.ai/api/image/aFUoyDvVbr2-V93y/call-cal-2.png" alt="International Phone" />
            </div>
            <div className="contact-details">
              <p className="label">International Phone Number</p>
              <p className="value">+966115065777</p>
            </div>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-content">
            <div className="icon-container">
              <img src="https://dashboard.codeparrot.ai/api/image/aFUoyDvVbr2-V93y/mail.png" alt="Email" />
            </div>
            <div className="contact-details">
              <p className="label">Email</p>
              <p className="value">InvestorCare@misa.gov.sa</p>
            </div>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-content">
            <div className="icon-container">
              <img src="https://dashboard.codeparrot.ai/api/image/aFUoyDvVbr2-V93y/twitter.png" alt="X Platform" />
            </div>
            <div className="contact-details">
              <p className="label">X Platform</p>
              <p className="value">Investors care</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsSection;
