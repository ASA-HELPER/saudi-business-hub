import React, { useState } from 'react';
import styled from 'styled-components';
import {
  UseFormRegister,
  UseFormSetValue,
  RegisterOptions,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from 'react-hook-form';

import tickIcon from '../../../assets/images/register/elements.png';
import Modal from '../Modal/Modal';
import ResuableOTPBox from './ResuableOTPBox';

interface Props {
  label: string;
  name: string;
  placeholder: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  validationRules?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
  width?: string;
  onVerifyChange?: (isVerified: boolean) => void; 
  identifierType: 'email' | 'phone';
}


const ReusableVerificationInput: React.FC<Props> = ({
  label,
  name,
  placeholder,
  register,
  setValue,
  validationRules,
  error,
  disabled,
  width,
  onVerifyChange,
  identifierType,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isValidInput = () => {
    if (identifierType === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue);
    }
    if (identifierType === 'phone') {
      return /^[0-9]{6,15}$/.test(inputValue); // or use libphonenumber if needed
    }
    return false;
  };

  const handleVerifyClick = () => {
    if (inputValue && isValidInput()) {
      setShowModal(true);
    }
  };

  const handleOTPComplete = () => {
    setIsVerified(true);
    setShowModal(false);
    onVerifyChange?.(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setValue(name, value);
    if (isVerified) {
      setIsVerified(false);
      onVerifyChange?.(false);
    }
  };

  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>

      <InputWrapperWithVerifyText $width={width}>
        <InputWrapper hasError={!!error}>
          <Input
            id={name}
            type={identifierType === 'email' ? 'email' : 'text'}
            placeholder={placeholder}
            {...register(name, validationRules)}
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
          />
          {isVerified && <StatusIcon src={tickIcon} alt="Verified" />}
        </InputWrapper>

        {!isVerified && inputValue && isValidInput() && (
          <VerifyText onClick={handleVerifyClick}>
            Verify {identifierType === 'email' ? 'Email' : 'Phone'}
          </VerifyText>
        )}
      </InputWrapperWithVerifyText>

      {typeof error?.message === 'string' && (
        <ErrorMessage>{error.message}</ErrorMessage>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={`Verify Your ${identifierType === 'email' ? 'Email' : 'Phone'}`}
        description={`We have sent a verification code to ${inputValue}. Please enter it below.`}
        confirmText=""
        cancelText=""
      >
        <ResuableOTPBox
          identifier={inputValue}
        //  identifierType={identifierType}
          onComplete={handleOTPComplete}
          resendDelay={420}
          onResend={() => {}}
        />
      </Modal>
    </InputContainer>
  );
};

export default ReusableVerificationInput;



const InputContainer = styled.div`
  margin-bottom: clamp(16px, 2vh, 24px);
`;

const Label = styled.label`
    color: #3E4448;
    font-size: 16px;
    display: block;
    margin-bottom: 8px;
`;

const InputWrapperWithVerifyText = styled.div<{ $width?: string }>`
  width: clamp(280px, 5vw, 538px);
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div<{ hasError: boolean }>`
  height: clamp(30px, 5vh, 40px);
  display: flex;
  align-items: center;
  border: 1px solid ${({ hasError }) => (hasError ? '#CC3434' : '#ccc')};
  border-radius: 5px;
  padding: clamp(8px, 1.2vh, 14px) clamp(10px, 2vw, 10px);
  background: white;
  box-sizing: border-box;
`;

const Input = styled.input`
  flex: 1;
  font-size: clamp(14px, 1.3vw, 16px);
  border: none;
  outline: none;
  margin-top: clamp(2px, 0.5vh, 4px);
  background-color: white; /* Reset autofill background */
  color: #000; /* Optional: Ensure font color is readable */

  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: #000 !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-box-shadow: 0 0 0px 1000px white inset !important;
    -webkit-text-fill-color: #000 !important;
  }
`;

const VerifyText = styled.div`
  margin-top: clamp(6px, 0.8vh, 10px);
  color: #00778e;
  font-size: clamp(12px, 1vw, 14px);
  font-weight: 500;
  cursor: pointer;
  text-align: right;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;

const StatusIcon = styled.img`
  width: clamp(16px, 1.5vw, 18px);
  height: clamp(16px, 1.5vw, 18px);
`;

const ErrorMessage = styled.div`
  color: #CC3434;
  font-weight: 500;
  font-size: clamp(12px, 1vw, 14px);
  margin-top: clamp(5px, 0.8vh, 7px);
`;