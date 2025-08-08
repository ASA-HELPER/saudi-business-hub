import React, { useState } from 'react';
import styled from 'styled-components';
import {
  UseFormRegister,
  RegisterOptions,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from 'react-hook-form';
import eye from '../../../assets/images/eye.png';
import eyeSlash from '../../../assets/images/eye-slash.png';
import arrowIcon from '../../../assets/images/arrow-down-01.png';

interface Props {
  label: string;
  name: string;
  placeholder: string;
  icon?: string;
  type?: string;
  required?: boolean;
  isPassword?: boolean;
  register: UseFormRegister<any>;
  validationRules?: RegisterOptions;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  disabled?: boolean;
  width?: string;
  prefixOptions?: string[];
}

const ReusableInputSm: React.FC<Props> = ({
  label,
  name,
  placeholder,
  icon,
  required, 
  type = 'text',
  isPassword = false,
  register,
  validationRules,
  error,
  width,
  prefixOptions,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputContainer>
      <Label htmlFor={name}>
        {required && <RequiredMark>*</RequiredMark>}
        {label}
      </Label>
      <InputWrapper hasError={!!error} $width={width}>
        {prefixOptions && (
          <PrefixSelect {...register(`${name}_prefix`)}>
            {prefixOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </PrefixSelect>
        )}
        {icon && <Icon src={icon} alt="icon" />}
        <Input
          id={name}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          {...register(name, validationRules)}
        />
        {isPassword && (
          <Toggle type="button" onClick={() => setShowPassword((prev) => !prev)}>
            <img src={showPassword ? eyeSlash : eye} alt="Toggle Password" width={18} height={18} />
          </Toggle>
        )}
      </InputWrapper>
      {typeof error?.message === 'string' && <ErrorMessage>{error.message}</ErrorMessage>}
    </InputContainer>
  );
};

export default ReusableInputSm;

// Styled Components
const InputContainer = styled.div`
  margin-bottom: clamp(16px, 2vh, 24px);
`;

const RequiredMark = styled.span`
  color: #CC3434;
  margin-right: 2px; 
  order: -1; 
  &::after {
    content: '*';
  }
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  color: #3E4448;
  font-size: clamp(10px, 1vw, 14px);
  margin-bottom: 8px;
`;

const InputWrapper = styled.div<{ hasError: boolean; $width?: string }>`
  // width: clamp(280px, 5vw, 538px);
  width: 100%;
  height: clamp(30px, 5vh, 40px);
  display: flex;
  align-items: center;
  border: 1px solid ${({ hasError }) => (hasError ? '#CC3434' : '#ccc')};
  border-radius: 5px;
  padding: clamp(0px , 1.2vh, 0px) clamp(0px, 2vw, 0px);
  background: white;
  box-sizing: border-box;

  input {
    padding-left: 10px !important;
  }
`;

const PrefixSelect = styled.select`
  border: none;
  color: #6C737F;
  background: #f1f4f6;
  padding: clamp(6px, 1vh, 8px) clamp(30px, 2.2vw, 40px) clamp(6px, 1vh, 8px) clamp(10px, 1vw, 14px);
  border-radius: 4px;
  font-size: clamp(13px, 1.2vw, 15px);
  appearance: none;
  outline: none;
  height: clamp(28px, 5vh, 38px);
  background-image: url(${arrowIcon});
  background-repeat: no-repeat;
  background-position: right clamp(8px, 0.8vw, 12px) center;
`;

const Icon = styled.img`
  width: clamp(18px, 1.5vw, 22px);
  height: clamp(18px, 1.5vw, 22px);
  margin-right: clamp(6px, 0.8vw, 10px);
`;

const Input = styled.input`
  flex: 1;
  font-size: clamp(14px, 1.3vw, 16px);
  border: none;
  outline: none;
  margin-top: clamp(2px, 0.5vh, 4px);
`;

const Toggle = styled.button`
  background: none;
  border: none;
  font-size: clamp(14px, 1.3vw, 16px);
  cursor: pointer;

  img {
    width: clamp(16px, 1.2vw, 18px);
    height: clamp(16px, 1.2vw, 18px);
  }
`;

const ErrorMessage = styled.div`
  color: #CC3434;
  font-weight: 500;
  font-size: clamp(12px, 1vw, 14px);
  margin-top: clamp(5px, 0.8vh, 7px);
`;
