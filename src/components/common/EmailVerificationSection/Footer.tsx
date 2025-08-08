import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FooterContainer,
  FooterSection,
  StyledLink,
  TroubleText,
} from './styles/Footer.styles';

interface FooterProps {
  linkName: string;
  linkPath: string;
}

const Footer: React.FC<FooterProps> = ({ linkName, linkPath }) => {
    const navigate = useNavigate();
  return (
    <FooterContainer>
      <FooterSection>
          <StyledLink  onClick={() => navigate(linkPath)}>
      {linkName}
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
