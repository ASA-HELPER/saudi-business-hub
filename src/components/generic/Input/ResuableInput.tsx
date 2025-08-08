import React, { useState } from "react";
import styled from "styled-components";
import {
  UseFormRegister,
  RegisterOptions,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import arrowIcon from "../../../assets/images/arrow-down-01.png";
import eye from "../../../assets/images/eye.png";
import eyeSlash from "../../../assets/images/eye-slash.png";

interface Props {
  label: string;
  name: string;
  placeholder: string;
  icon?: string;
  required?: boolean;
  type?: string;
  isPassword?: boolean;
  register: UseFormRegister<any>;
  validationRules?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  prefixError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
  width?: string;
  prefixOptions?: Array<string | { label: string; value: string | number }>;
  prefixValidationRules?: RegisterOptions;
}

const ReusableInput: React.FC<Props> = ({
  label,
  name,
  required,
  placeholder,
  icon,
  type = "text",
  isPassword = false,
  register,
  validationRules,
  error,
  width,
  prefixOptions,
  prefixError,
  prefixValidationRules,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputContainer>
      <Label htmlFor={name} required={required}>
        {label}
      </Label>
      <InputWrapper
        hasError={!!error}
        $width={width}
        hasPrefix={!!prefixOptions}
      >
        {prefixOptions && (
          <PrefixSelect {...register(`${name}_prefix`, prefixValidationRules)}>
            {prefixOptions.map((option) => {
              if (typeof option === "string") {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              }
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </PrefixSelect>
        )}

        {icon && <Icon src={icon} alt="icon" />}
        <Input
          id={name}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          {...register(name, validationRules)}
        />
        {isPassword && (
          <Toggle
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <img
              src={showPassword ? eyeSlash : eye}
              alt="Toggle Password"
              width={18}
              height={18}
            />
          </Toggle>
        )}
      </InputWrapper>
      <InputErrorWrapper>
        {typeof prefixError?.message === "string" && (
          <ErrorMessage>{prefixError.message}</ErrorMessage>
        )}
        {typeof error?.message === "string" && (
          <ErrorMessage>{error.message}</ErrorMessage>
        )}
      </InputErrorWrapper>
    </InputContainer>
  );
};

export default ReusableInput;

// Styled Components
const InputContainer = styled.div`
  // margin-bottom: clamp(2px, 2vh, 4px);
`;

const Label = styled.label<{ required?: boolean }>`
  font-weight: 500;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  color: #3e4448;
  font-size: clamp(10px, 1vw, 14px);
  display: block;
  margin-bottom: clamp(4px, 0.8vh, 8px);

  ${({ required }) =>
    required &&
    `
    &:before {
      content: '* ';
      color: #CC3434;
      margin-left: 2px;
    }
  `}
`;

const InputWrapper = styled.div<{
  hasError: boolean;
  $width?: string;
  hasPrefix?: boolean;
}>`
  width: 100%;
  height: clamp(40px, 5vh, 48px); /* Ensures consistent height */
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ hasError }) => (hasError ? "#CC3434" : "#ccc")};
  padding: 0;
  background: transparent;
  box-sizing: border-box;
  position: relative;

  &:focus-within {
    border-bottom-color: ${({ hasError }) =>
      hasError ? "#CC3434" : "#127B7E"};
  }
`;

const PrefixSelect = styled.select`
  border: none;
  color: #6c737f;
  background: #f1f4f6;
  height: 70%; /* ensures it doesn't exceed wrapper */
  padding: 0 clamp(10px, 1vw, 14px);
  border-radius: 4px;
  font-size: clamp(13px, 1.2vw, 15px);
  appearance: none;
  outline: none;
  margin-right: 8px;
  background-image: url(${arrowIcon});
  background-repeat: no-repeat;
  background-position: right clamp(10px, 0.8vw, 14px) center;
  background-size: clamp(12px, 1vw, 18px);
  display: flex;
  align-items: center;
  width: auto;
  min-width: 80px;
  max-width: 140px;
`;

const Icon = styled.img`
  width: clamp(16px, 1.5vw, 18px);
  height: clamp(16px, 1.5vw, 18px);
  margin-right: clamp(6px, 0.8vw, 10px);
`;

const Input = styled.input`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  background: #f9f9f9;
  flex: 1;
  font-weight: 400;
  font-size: clamp(12px, 1.3vw, 14px);
  height: 100%;
  border: none;
  outline: none;
  padding: 0 clamp(10px, 1vw, 14px);
`;

const Toggle = styled.button`
  font-family: "IBM Plex Sans Arabic", sans-serif
  font-weight: 500;
  background: none;
  border: none;
  font-size: clamp(14px, 1.3vw, 16px);
  cursor: pointer;

  img {
    width: clamp(16px, 1.2vw, 18px);
    height: clamp(16px, 1.2vw, 18px);
  }
`;

const InputErrorWrapper = styled.div`
  min-height: 20px;
  margin-top: clamp(5px, 0.8vh, 7px);
  display: flex;
  flex-direction: row;
`;

const ErrorMessage = styled.div`
  color: #cc3434;
  font-weight: 500;
  font-size: clamp(12px, 1vw, 14px);
  margin-right: 20px;
  margin-bottom: 20px;
`;
