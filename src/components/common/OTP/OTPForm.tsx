import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import OTPVerification from './OTPVerification';

const FormWrapper = styled.div`
  margin-top: 20px;
`;

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const Title = styled.h1`
  margin-bottom: 28px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: clamp(16px, 1.8vw, 28px);
  text-transform: uppercase;
  color: #121212;
  text-align: center;
  width: 100%;
`;

const Paragraph = styled.p`
  margin-top: 15px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #3E4448;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const ParagraphWrapper = styled.div`
  width: 100%;
  max-width: clamp(320px, 39vw, 538px);
  margin: 0 auto;
  margin-bottom: 40px;
`;

const OTPForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [identifiers, setIdentifiers] = useState<{ type: 'mobile' | 'email'; value: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    const serverResponse = {
      mobile: '966 501 234567',
      email: 'omarmajid@gmail.com', // or null if not provided
    };

    const temp: { type: 'mobile' | 'email'; value: string }[] = [];

    if (serverResponse.mobile) {
      temp.push({ type: 'mobile', value: serverResponse.mobile });
    }
    if (serverResponse.email) {
      temp.push({ type: 'email', value: serverResponse.email });
    }

    setIdentifiers(temp);
  }, []);

  const onSubmit = (data: any) => {
    console.log('Forget Password Data:', data);
    setSubmitted(true);
    reset();
  };

  return (
    <FormWrapper>
      
      {identifiers.length > 0 && (
        <OTPVerification
          identifiers={identifiers}
          onComplete={(type, otp) => {
            console.log(`${type} OTP entered:`, otp);
          }}
        />
      )}
    </FormWrapper>
  );
};

export default OTPForm;
