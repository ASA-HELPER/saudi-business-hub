import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FooterContainer,
  FooterSection,
  StyledLink,
  TroubleText,
} from './Footer.styles';

const Footer: React.FC = () => {
    const navigate = useNavigate();
  return (
    <FooterContainer>
      <FooterSection>
          <StyledLink  onClick={() => navigate('/register')}>
      Register
    </StyledLink>
      </FooterSection>
      <FooterSection>
        <TroubleText>Facing any Issue?</TroubleText>
        <StyledLink onClick={() => navigate('/contact-us')}>Contact Us</StyledLink>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
