import React from 'react';
import styled, { css } from 'styled-components';
import arrowRight from "../../../assets/images/button-arrow.png"

type ButtonProps = {
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
 // width: clamp(280px, 30vw, 538px); /* Responsive width */
  width: 100%;
  height: ${({ height }) => height};
  padding: 0 24px;
  border-radius: 4px;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: clamp(14px, 1.6vw, 16px); /* Optional: responsive font size */
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;

  ${({ color, variant }) => {
    if (variant === 'outlined') {
      return css`
        background-color: white;
        color: #0C3957;
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
  margin-left: 10px;
`;


const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = '#007C92',
  variant = 'filled',
  height = '45px',
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
      {text}
      {variant !== 'outlined' && <ArrowIcon src={arrowRight} alt="arrow" />}
    </StyledButton>
  );
};


export default Button;
