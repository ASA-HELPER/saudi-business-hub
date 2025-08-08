import React from 'react';
import styled, { css } from 'styled-components';
import arrowIcon from '../../../assets/images/back-button-login.png'; // ✅ update this path based on your project

type RegisterBackButtonProps = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: string;
  variant?: 'filled' | 'outlined';
  width?: string;
  height?: string;
  disabled?: boolean;
};

const StyledButton = styled.button<{
  color: string;
  variant: 'filled' | 'outlined';
  height: string;
  disabled?: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: clamp(280px, 5vw, 538px);
  height: ${({ height }) => height};
  padding: 0 24px;
  border-radius: 8px;
  font-size: clamp(14px, 1.6vw, 16px);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  ${({ color, variant }) => {
    if (variant === 'outlined') {
      return css`
        background-color: white;
        color: rgb(0, 0, 0);
        border-color: ${color};

        &:hover {
          background-color: ${color};
          color: white;
        }
      `;
    }

    return css`
      background-color: ${color};
      color: white;

      &:hover {
        opacity: 0.9;
      }
    `;
  }}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const RegisterBackButton: React.FC<RegisterBackButtonProps> = ({
  text,
  onClick,
  color = '#007C92',
  variant = 'filled',
  height = '40px',
  disabled = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      variant={variant}
      height={height}
      disabled={disabled}
    >
      <ArrowIcon src={arrowIcon} alt="Back arrow" />
      {text}
    </StyledButton>
  );
};

export default RegisterBackButton;
