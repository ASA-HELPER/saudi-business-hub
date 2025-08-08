import React, { useState } from "react";
import styled from "styled-components";
import heroBg from "../../../../assets/images/hero-bg.png";
import dropdownIcon from "../../../../assets/images/dropdown.svg";
import headerLogo from "../../../../assets/images/header-logo.svg";
import personIcon from "../../../../assets/images/person.svg";
import menuIcon from "../../../../assets/images/menu-icon.svg";
import {
  LanguageButton,
  LanguageSwitch,
} from "../../../../pages/Login/LoginComponent.styles";

const HeroWrapper = styled.div`
 background-image: 
    linear-gradient(rgba(0, 38, 58, 0.8), rgba(0, 38, 58, 0.8)),
    url(${heroBg});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  color: white;

  /* Shrink vertical space but keep responsive */
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`;

const NavbarStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  flex-wrap: wrap;
  background: rgba(0, 38, 58, 0.95);
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 400;
  }
`;

const Logo = styled.div`
  height: 62px;
`;

const LogoImage = styled.img`
  width: 300px;
  height: 62px;
  object-fit: contain;
`;

const PersonImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

const ProfileName = styled.span`
  position: relative;
  padding-left: 1rem;
  margin-left: 1rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 1px;
    background-color: white;
    opacity: 0.6;
  }
`;

const LanguageSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${LanguageSwitch} {
    margin-bottom: 0;
  }
`;

const HeroContent = styled.div`
  padding: 2rem 8rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
    padding: 3rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
 font-size: 30px;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background: white;
  color: #003c56;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;



const HeroSection = () => {
  const [language, setLanguage] = useState<"en" | "ar">("ar");

  return (
    <HeroWrapper>
      <NavbarStyled>
        <NavLeft>
          <Logo>
            <LogoImage src={headerLogo} alt="Logo" />
          </Logo>
        </NavLeft>
        <NavRight>
          <NavLinks>
            <NavItem>
              <span>Home</span>
              <img src={dropdownIcon} alt="dropdown" />
            </NavItem>
            <NavItem>
              <span>Oppsdfortunities</span>
              <img src={dropdownIcon} alt="dropdown" />
            </NavItem>
            <NavItem>
              <span>Service</span>
              <img src={dropdownIcon} alt="dropdown" />
            </NavItem>
            <NavItem>
              <span>Contacts</span>
              <img src={dropdownIcon} alt="dropdown" />
            </NavItem>
          </NavLinks>

          <ProfileName>
            <NavItem>
              <PersonImage src={personIcon} alt="profile" />
              <span>Omar Majid</span>
              <img src={dropdownIcon} alt="dropdown" />
            </NavItem>
          </ProfileName>

          <LanguageSwitchWrapper>
            <LanguageSwitch>
              <LanguageButton
                active={language === "en"}
                onClick={() => setLanguage("en")}
              >
                English
              </LanguageButton>
              <LanguageButton
                active={language === "ar"}
                onClick={() => setLanguage("ar")}
              >
                العربية
              </LanguageButton>
            </LanguageSwitch>
          </LanguageSwitchWrapper>

          <img src={menuIcon} alt="menu" />
        </NavRight>
      </NavbarStyled>

      <HeroContent>
        <Title>Contact Us</Title>
        <Subtitle>
          Assistance available 24/7 in English, German, Japanese, French, Spanish, Korean and Chinese.
        </Subtitle>
      </HeroContent>
    </HeroWrapper>
  );
};

export default HeroSection;
