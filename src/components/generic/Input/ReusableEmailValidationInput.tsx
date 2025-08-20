import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Control, useController, RegisterOptions } from "react-hook-form";

import tickIcon from "../../../assets/images/register/elements.png";
import Modal from "../Modal/Modal";
import ResuableOTPBox from "./ResuableOTPBox";
import { RESET_VERIFY_MAIL_OTP_STATE } from "../../../store/types/emailOtpTypes";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

interface Props {
  label: string;
  name: string;
  required?: boolean;
  placeholder: string;
  control: Control<any>;
  validationRules?: RegisterOptions;
  disabled?: boolean;
  width?: string;
  onVerifyChange?: (isVerified: boolean) => void;
  onVerifyClick?: (email: string) => void;
  otpRequestCount: number;
  onVerifyOtp?: (otp: string) => void;
  otpVerified: boolean;
  otpError: boolean;
}

const ReusableEmailValidationInput: React.FC<Props> = ({
  label,
  name,
  placeholder,
  required,
  control,
  validationRules,
  disabled,
  width,
  onVerifyChange,
  onVerifyClick,
  otpRequestCount,
  onVerifyOtp,
  otpVerified,
  otpError,
}) => {
  const dispatch = useDispatch();

  const {
    field: { value, onChange, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: validationRules,
  });

  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    console.log("otperror----->", otpError);
    if (otpError) {
      setShowModal(false); // Close modal if error occurs
      onVerifyChange?.(false);
    }
  }, [otpError]);

  // ✅ Open modal every time OTP is requested
  useEffect(() => {
    if (otpRequestCount > 0 && value) {
      setShowModal(true);
      setIsVerified(false);
      onVerifyChange?.(false);
    }
  }, [otpRequestCount]);

  const clearState = () => {
    dispatch({ type: RESET_VERIFY_MAIL_OTP_STATE });
  };

  // ✅ Mark as verified if otpVerified becomes true
  useEffect(() => {
    if (otpVerified) {
      setIsVerified(true);
      setShowModal(false);
      onVerifyChange?.(true);
      clearState();
    }
  }, [otpVerified]);

  const handleVerifyClick = () => {
    if (value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      onVerifyClick?.(value);
    }
  };

  const handleOTPComplete = (otp: string) => {
    onVerifyOtp?.(otp);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    onChange(newVal);
    if (isVerified) {
      setIsVerified(false);
      onVerifyChange?.(false);
    }
  };
  
  const { t } = useTranslation();

  return (
    <InputContainer>
      <Label htmlFor={name} $required={required}>
        {label}
      </Label>

      <InputWrapperWithVerifyText $width={width}>
        <InputWrapper hasError={!!error}>
          <Input
            id={name}
            type="email"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            disabled={disabled}
            ref={ref}
          />
          {isVerified && <StatusIcon src={tickIcon} alt="Verified" />}
        </InputWrapper>

        <StatusRow>
          <ErrorSlot>
            {typeof error?.message === "string" && (
              <ErrorMessage>{error.message}</ErrorMessage>
            )}
          </ErrorSlot>

          <RightSlot>
            {!isVerified &&
              value &&
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && (
                <VerifyText onClick={handleVerifyClick}>
                  {t("register.verify_email")}
                </VerifyText>
              )}
          </RightSlot>
        </StatusRow>
      </InputWrapperWithVerifyText>

      <Modal
        show={showModal}
        onClose={() => {
          clearState();
          setShowModal(false);
        }}
        title={t("register.verify_your_email")}
        confirmText=""
        cancelText=""
      >
        <ResuableOTPBox
          identifier={value}
          identifierType="email"
          onComplete={handleOTPComplete}
          resendDelay={420}
          onResend={() => {}}
        />
      </Modal>
    </InputContainer>
  );
};

export default ReusableEmailValidationInput;

// Styled components...
const InputContainer = styled.div`
  margin-bottom: clamp(16px, 2vh, 24px);
`;

const Label = styled.label<{ $required?: boolean }>`
  color: #3e4448;
  font-size: clamp(10px, 1vw, 14px);
  display: block;
  margin-bottom: 8px;
    font-weight: 500;

  ${({ $required }) =>
    $required &&
    `
    &:before {
      content: '*';
      color: #CC3434;
      margin-right: 4px;
    }
  `}
`;

const InputWrapperWithVerifyText = styled.div<{ $width?: string }>`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div<{ hasError: boolean }>`
  width: 100%;
  height: clamp(40px, 5vh, 48px);
  display: flex;
  align-items: center;
  padding: 0 clamp(10px, 1vw, 14px);
  background: transparent;
  border-bottom: 1px solid
    ${({ hasError }) => (hasError ? "#127B7E" : "#ccc")};
  transition: border-color 0.3s ease;

  &:focus-within {
    border-bottom-color: ${({ hasError }) =>
      hasError ? "#127B7E" : "#127B7E"};
  }
`;

const Input = styled.input`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  flex: 1;
  font-size: clamp(14px, 1.3vw, 16px);
  border: none;
  outline: none;
  background-color: transparent;
  color: #000;
  height: 100%;

  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px #f9f9f9 inset !important;
    -webkit-box-shadow: 0 0 0px 1000px #f9f9f9 inset !important;
    -webkit-text-fill-color: #000 !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:-webkit-autofill:focus {
    box-shadow: 0 0 0px 1000px #f9f9f9 inset !important;
    -webkit-box-shadow: 0 0 0px 1000px #f9f9f9 inset !important;
    -webkit-text-fill-color: #000 !important;
  }
`;

const VerifyText = styled.div`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  color: #00778e;
  font-size: clamp(12px, 1vw, 14px);
  font-weight: 700;
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
  margin-left: 8px;
`;

const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: clamp(5px, 0.8vh, 7px);
  min-height: 24px;
`;

const ErrorSlot = styled.div`
  flex: 1;
`;

const RightSlot = styled.div`
  text-align: right;
`;

const ErrorMessage = styled.div`
  color: #cc3434;
  font-weight: 500;
  font-size: clamp(12px, 1vw, 14px);
`;
