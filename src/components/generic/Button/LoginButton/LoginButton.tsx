import React from 'react';
import styled from 'styled-components';
import defaultNafathLogo from '../../../../assets/images/nafath-logo.png';

const StyledButton = styled.button`
  width: 100%;
  // width: clamp(280px, 30vw, 538px);
  height: 40px;
  padding: 0 16px;
  border-radius: 4px;
  border: 1px solid #00778E;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: rgba(0, 119, 142, 0.05);
  }

  &:active {
    background-color: rgba(0, 119, 142, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const NafathLogo = styled.img`
  width: 46px;
  height: 18px;
  object-fit: contain;
`;

const ButtonText = styled.span`
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #161616;
`;

interface LoginButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  text?: string;
  showLogo?: boolean;
  logo?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  onClick,
  disabled = false,
  text = 'Login with Nafath ID',
  showLogo = true,
  logo,
}) => {
  const logoToShow = logo || defaultNafathLogo;

  return (
    <StyledButton onClick={onClick} disabled={disabled}>
      <TextWrapper>
        {showLogo && <NafathLogo src={logoToShow} alt="Logo" />}
        <ButtonText>{text}</ButtonText>
      </TextWrapper>
    </StyledButton>
  );
};

export default LoginButton;
