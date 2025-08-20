import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  UseFormRegister,
  UseFormSetValue,
  RegisterOptions,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";

import tickIcon from "../../../assets/images/register/elements.png";
import Modal from "../Modal/Modal";
import ResuableOTPBox from "./ResuableOTPBox";
import arrowIcon from "../../../assets/images/arrow-down-01.png";
import i18n from "../../../i18n";

interface Props {
  label: string;
  name: string;
  required?: boolean;
  placeholder: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  validationRules?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
  width?: string;
  prefixOptions?: string[];
  onVerifyChange?: (isVerified: boolean) => void;
  isVerified?: boolean;
  isRTL?: boolean;

}

const ReusableMobileValidationInput: React.FC<Props> = ({
  label,
  name,
  required,
  placeholder,
  register,
  setValue,
  validationRules,
  error,
  disabled,
  width,
  prefixOptions = ["+91"],
  onVerifyChange,
  isVerified,
  isRTL,
}) => {
  const [showModal, setShowModal] = useState(false);
  //const [isVerified, setIsVerified] = useState(false);
  const [mobileValue, setMobileValue] = useState("");
  const [prefix, setPrefix] = useState(prefixOptions[0]);

  const isValidPhone = (value: string) => /^[0-9]{6,15}$/.test(value);

  const registered = register(name, validationRules);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileValue(value);
    setValue(name, value, { shouldValidate: true });

    if (isVerified) {
      //setIsVerified(false);
      onVerifyChange?.(false);
    }

    registered.onChange(e);
  };

  const handleVerifyClick = () => {
    if (mobileValue && isValidPhone(mobileValue)) {
      setShowModal(true);
    }
  };

  const handleOTPComplete = () => {
    //setIsVerified(true);
    setShowModal(false);
    onVerifyChange?.(true);
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPrefix = e.target.value;
    setPrefix(selectedPrefix);
    setValue(`${name}_prefix`, selectedPrefix);
    registered.onChange(e);
  };

  const [inputKey, setInputKey] = useState(0);

  useEffect(() => {
    setInputKey(prev => prev + 1);
    setMobileValue('');
  }, [isRTL]);

  return (
    <InputContainer>
      <Label htmlFor={name} $required={required}>
        {label}
      </Label>
      <InputWrapperWithVerifyText $width={width}>
        <InputWrapper hasError={!!error}>
          {prefixOptions.length > 0 && (
            <PrefixSelect value={prefix} onChange={handlePrefixChange} isRTL={isRTL}>
              {prefixOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </PrefixSelect>
          )}
          <Input
            dir={i18n.dir()}
            id={name}
            type="tel"
            placeholder={placeholder}
            {...registered}
            onChange={handleInputChange}
            value={mobileValue}
            disabled={disabled}
            maxLength={15}
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
            {!isVerified && isValidPhone(mobileValue) && (
              <VerifyText onClick={handleVerifyClick}>Verify Mobile</VerifyText>
            )}
          </RightSlot>
        </StatusRow>
      </InputWrapperWithVerifyText>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Verify Your Mobile Number"
        confirmText=""
        cancelText=""
      >
        <ResuableOTPBox
          identifier={`${prefix}${mobileValue}`}
          identifierType="mobile"
          onComplete={handleOTPComplete}
          resendDelay={420}
          onResend={() => {}}
        />
      </Modal>
    </InputContainer>
  );
};

export default ReusableMobileValidationInput;

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
  width: 100%
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div<{ hasError: boolean }>`
  width: 100%;
  height: clamp(40px, 5vh, 48px); // Ensures uniform height
  display: flex;
  align-items: center;
  border-bottom: 1px solid
    ${({ hasError }) => (hasError ? "#127B7E" : "#ccc")};
  background: transparent;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-bottom-color: ${({ hasError }) =>
      hasError ? "#127B7E" : "#127B7E"};
  }
`;

const PrefixSelect = styled.select<{ isRTL?: boolean }>`
  height: 100%; 
  padding: 0 clamp(10px, 1vw, 14px);
  font-size: clamp(13px, 1.2vw, 15px);
  border: none;
  border-radius: 4px;
  background: #f1f4f6 url(${arrowIcon}) no-repeat
    ${({ isRTL }) => (isRTL ? 'left' : 'right')} clamp(10px, 0.8vw, 14px) center;
  background-size: clamp(12px, 1vw, 18px);
  appearance: none;
  outline: none;
  margin-right: ${({ isRTL }) => (isRTL ? '0' : '8px')};
  margin-left: ${({ isRTL }) => (isRTL ? '8px' : '0')};
  color: #6c737f;
  min-width: 80px;
  max-width: 140px;
  text-align: start;
  direction: ${({ isRTL }) => (isRTL ? 'rtl' : 'ltr')};
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  font-size: clamp(14px, 1.3vw, 16px);
  border: none;
  outline: none;
  background-color: #f9f9f9;
  color: #000;

  /* This makes placeholder/text auto-flip */
  text-align: start;

  /* caret & flow follow dir */
  direction: inherit;

  &::placeholder {
    color: #999;
    opacity: 1;
  }
`;

const VerifyText = styled.div`
  color: #00778e;
  font-size: clamp(12px, 1vw, 14px);
  font-weight: 600;
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
  margin-top: clamp(5px, 0.8vh, 7px);
`;
