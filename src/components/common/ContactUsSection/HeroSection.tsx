import React from 'react';
import styled from 'styled-components';
import Navbar from '../../generic/PageLayout/NavBar/NavBar';
// import TopBar from './TopBar';

const HeroSectionContainer = styled.div`
    height: 564px;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0) 100%), url();
    background-size: cover;
    color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const HeroDescription = styled.p`
  font-size: 18px;
  line-height: 1.5;
`;

const HeroSection: React.FC = () => {
  return (
    <>
    </>
    // <HeroSectionContainer>
    //   <Navbar />
    //   <HeroContent>
    //     <HeroTitle>Contact Us</HeroTitle>
    //     <HeroDescription>
    //       Assistance available 24/7 in English, German, Japanese, French, Spanish, Korean and Chinese.
    //     </HeroDescription>
    //   </HeroContent>
    // </HeroSectionContainer>
  );
};

export default HeroSection;
