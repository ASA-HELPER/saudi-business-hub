import React from 'react';
import styled from 'styled-components';
import arrowIcon from '../../../assets/images/back-button-login.png';

type BackButtonProps = {
  text: string;
  onClick?: () => void;
  color?: string;
  disabled?: boolean;
};

const StyledTextButton = styled.button<{ color: string; disabled?: boolean }>`
  background: none;
  border: none;
  padding: 0;
  margin-top: 60px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: clamp(12px, 1.6vw, 16px);
  color: ${({ color }) => color};
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.4;
      pointer-events: none;
      cursor: not-allowed;
    `}
`;

const ArrowIcon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
`;

const BackButton: React.FC<BackButtonProps> = ({
  text,
  onClick,
  color = '#007C92',
  disabled = false,
}) => {
  return (
    <StyledTextButton onClick={onClick} color={color} disabled={disabled}>
      <ArrowIcon src={arrowIcon} alt="Back arrow" />
      {text}
    </StyledTextButton>
  );
};

export default BackButton;
