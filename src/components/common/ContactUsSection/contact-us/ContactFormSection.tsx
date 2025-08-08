import React, { useState } from 'react';
import styled from 'styled-components';

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    subject: '',
    message: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      subject: '',
      message: '',
    });
    setSelectedFile(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData, selectedFile);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>
        Contact us right away if you have any questions about Saudi Arabia's sectors, regions or incentives.
      </Title>

      <Row>
        <FormGroup>
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Last Name*</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FormGroup>
      </Row>

      <Row>
        <FormGroup>
          <label>Mobile Number*</label>
          <MobileInput>
            <CountryCode>
              <span>+966</span>
              <span>▼</span>
            </CountryCode>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
          </MobileInput>
        </FormGroup>
        <FormGroup>
          <label>Email Address*</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormGroup>
      </Row>

      <FormGroup>
        <label>Subject</label>
        <input
          type="text"
          name="subject"
          placeholder="Enter Subject"
          value={formData.subject}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Your Message</label>
        <textarea
          name="message"
          placeholder="Enter Message"
          value={formData.message}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <label>Attachment</label>
        <UploadArea onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
          <div>
            <img src="https://dashboard.codeparrot.ai/api/image/aFUoyDvVbr2-V93y/mingcute.png" alt="upload" />
          </div>
          <label htmlFor="file-upload">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            Click here to upload or drop files here
          </label>
        </UploadArea>
      </FormGroup>

      <Actions>
        <button type="button" className="reset-button" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </Actions>
    </FormContainer>
  );
};

export default ContactFormSection;

// Styled Components
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1014px;
  padding: 36px;
  background-color: #ffffff;
  border-radius: 16px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: 146%;
  color: #121212;
  margin: 0;
`;

const Row = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 300px;

  label {
    font-family: '29LT Bukra', sans-serif;
    font-weight: 500;
    font-size: 16px;
    color: #3e4448;
  }

  input, textarea {
    height: 56px;
    padding: 10px 16px;
    border-radius: 6px;
    border: 2px solid #ccc;
    font-family: '29LT Bukra', sans-serif;
    font-size: 16px;
    color: #595e62;
    width: 100%;
    box-sizing: border-box;
  }

  textarea {
    border: 2px solid #ccc;
    min-height: 100px;
    resize: vertical;
  }
`;

const MobileInput = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #ccc;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
  color: #222222;
  input {
    border: none;
    flex: 1;
    padding: 10px;
  }
`;

const CountryCode = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background-color: #eff3f5;
  border-radius: 4px;
  margin: 6px;
`;

const UploadArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 50px 32px;
  background-color: #fafafab2;
  border: 1px solid #9e9e9e;
  border-radius: 8.66px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;

  label {
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    color: #4b4b4b;
    line-height: 200%;
    text-align: center;
    cursor: pointer;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 24px;
  padding-left: 140px;
  margin-top: 24px;
  flex-wrap: wrap;

  button {
    padding: 10px 16px;
    width: 188px;
    border-radius: 6px;
    font-family: '29LT Bukra', sans-serif;
    font-weight: 600;
    font-size: 18px;
    cursor: pointer;
    box-sizing: border-box;
  }

  .reset-button {
    background-color: #ffffff;
    border: 1.6px solid #00778e;
    color: #00778e;
    opacity: 0.5;
  }

  .reset-button:hover {
    opacity: 1;
  }

  .submit-button {
    background-color: #00778e;
    border: none;
    color: #ffffff;
  }

  .submit-button:hover {
    background-color: #006277;
  }
`;
