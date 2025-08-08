import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.div`
  bottom: 0;
  left: 0;
  right: 0;         
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 12px;
  background-color: transparent;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
`;

const StyledLink = styled.span`
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 600;
  color: #00778e;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const TroubleText = styled.span`
  font-size: clamp(12px, 1.2vw, 14px);
  font-weight: 400;
  color: #3e4448;
`;

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <FooterSection>
        <StyledLink onClick={() => navigate('/register')}>Register</StyledLink>
      </FooterSection>

      <FooterSection>
        <TroubleText>Facing any Issue?</TroubleText>
        <StyledLink onClick={() => navigate('/contact-us')}>
          Contact Us
        </StyledLink>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
