import React from 'react';
import styled from 'styled-components';

const LocationHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <VerticalLine />
      <HeaderContent>
        <Title>OUR LOCATIONS</Title>
        <Subtitle>Visit us at our easily accessible and local and International locations</Subtitle>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  min-width: 320px;
  padding: 16px;
  height: 97px;
  align-items: center;
`;

const VerticalLine = styled.div`
  width: 4px;
  height: 86px;
  background-color: #824b97;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Title = styled.h1`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 146%;
  color: #121212;
  text-transform: uppercase;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-family: '29LT Bukra', sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #555555;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`;

export default LocationHeader;

