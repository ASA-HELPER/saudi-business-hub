import React from "react";
import styled from "styled-components";
import {
  UseFormRegister,
  RegisterOptions,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";
import arrowIcon from "../../../assets/images/arrow-down-01.png";

interface Props {
  label: string;
  name: string;
  options: string[];
  register: UseFormRegister<any>;
  validationRules?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  width?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
}

const ReusableSelect: React.FC<Props> = ({
  label,
  name,
  options,
  register,
  validationRules,
  error,
  width,
  disabled,
  required,
  placeholder = "Select an option",
}) => {
  return (
    <SelectContainer>
      <Label htmlFor={name}>
        {label}
        {required && <RequiredMark />}
      </Label>
      <SelectWrapper hasError={!!error} $width={width}>
        <Select
          // key={(typeof window !== "undefined" ? document?.documentElement?.lang : "") || ""}
          id={name}
          {...register(name, validationRules)}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </SelectWrapper>
      <ErrorWrapper>
        {typeof error?.message === "string" && (
          <ErrorMessage>{error.message}</ErrorMessage>
        )}
      </ErrorWrapper>
    </SelectContainer>
  );
};

export default ReusableSelect;

// Styled Components
const SelectContainer = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  color: #3e4448;
  font-size: clamp(10px, 1vw, 14px);
  display: block;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
`;

const RequiredMark = styled.span`
  color: #cc3434;
  margin-right: 2px;
  order: -1;
  &::after {
    content: "*";
  }
`;

const SelectWrapper = styled.div<{ hasError: boolean; $width?: string; $isRTL?: boolean }>`
  width: 100%;
  position: relative;
  padding: 10px 0px;
  background: transparent;
  border-bottom: 1px solid
    ${({ hasError }) => (hasError ? "#CC3434" : "#A0AAB4")};
  transition: border-color 0.3s ease;

  &:focus-within {
    border-bottom-color: ${({ hasError }) =>
      hasError ? "#CC3434" : "#127B7E"};
  }

  &::after {
    content: "";
    position: absolute;
    ${({ $isRTL }) =>
      $isRTL
        ? `
          left: 0;
          right: unset;
        `
        : `
          right: 0;
          left: unset;
        `}
    top: 50%;
    transform: translateY(-50%);
    width: clamp(12px, 1vw, 16px);
    height: clamp(12px, 1vw, 16px);
    background: url(${arrowIcon}) no-repeat center center;
    background-size: contain;
    pointer-events: none;
  }
`;

const Select = styled.select`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  color: #3e4448;
  background: transparent;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-right: clamp(20px, 2vw, 30px);
`;

const ErrorWrapper = styled.div`
  min-height: 20px;
  margin-top: 5px;
`;

const ErrorMessage = styled.div`
  color: #cc3434;
  font-weight: 500;
  font-size: 14px;
  margin-top: 5px;
`;
