import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ReusableInput from '../../generic/Input/ResuableInput';
import Button from '../../generic/Button/Button';
import vector from '../../../assets/images/vector.png';

const FormWrapper = styled.div`
  margin-top: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;

const CenteredField = styled.div`
  margin: 0 auto;
`;

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const Paragraph = styled.p`
  margin-top: 15px;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  color: #3E4448;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const Title = styled.h1`
  margin-bottom: 28px;
  font-family: "IBM Plex Sans Arabic", sans-serif;;
  font-weight: 600;
  font-size: clamp(16px, 1.8vw, 28px);
  color: #0C3957;
  text-align: center;
  width: 100%;
`;

const ParagraphWrapper = styled.div`
  width: 100%;
  max-width: clamp(320px, 39vw, 538px);
  margin: 0 auto 40px;
`;

const EmailVerificationForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data: any) => {
   console.log('Forget Password Data:', data);
   setSubmitted(true);
   reset();
    navigate('/login/email-verify-success');
  };

  return (
    <FormWrapper>
      <Title>Email Verification</Title>

        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <CenteredField>
            <ReusableInput
              label="Email Address"
              name="email"
              placeholder="Enter Email Address"
              icon={vector}
              register={register}
              validationRules={{
                required: 'Enter your email address',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                },
              }}
              error={errors.email}
            />
          </CenteredField>

          <CenteredField>
            <Button text="Verify Email" disabled={!isValid} />
          </CenteredField>
        </StyledForm>
      
         <ParagraphWrapper>
        <Paragraph>
          <Button
            text="Back to login"
            onClick={() => navigate('/login')}
            variant="outlined" color="#007C92"
          />
        </Paragraph> 
        </ParagraphWrapper>
     
    </FormWrapper>
  );
};

export default EmailVerificationForm;
