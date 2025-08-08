import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  LayoutContainer,
  Content,
  LeftSection,
  RightSection,
} from './styles/Layout.styles';
import InvestmentInfo from '../../generic/InvestmentInfo/InvestmentInfo';
import NafathLoginForm from './NafathLoginForm';

const LoginFormComponent: React.FC = () => {
  return (
     <LayoutContainer>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <Content>
          <LeftSection>
            <InvestmentInfo />
          </LeftSection>
          <RightSection>
             <NafathLoginForm />
          </RightSection>
        </Content>
      </motion.div>
    </LayoutContainer>
  );
};

export default LoginFormComponent;

export const Title = styled.h1`
  padding-top: clamp(20px, 2.7vh, 30px);
  padding-bottom: clamp(16px, 2vh, 24px);
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: clamp(26px, 1.8vw, 34px);  // 1366px = 26px, 1920px = 34px
  font-weight: bold;
  color: #161616;
  opacity: 0.8;
  margin-bottom: clamp(10px, 1vh, 20px);
`;

export const SubTitle = styled.h2`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: clamp(20px, 1.5vw, 30px);
  font-weight: bold;
  color: #161616;
  opacity: 0.8;
  margin-bottom: clamp(16px, 2vh, 24px);
`;

export const InfoBox = styled.div`
   color: #161616;
  ul {
    padding-left: 5px;
    margin: 0;
    list-style-position: inside;
  }

  li {
    font-size: clamp(15px, 1.1vw, 16px);
    margin-bottom: clamp(14px, 3vh, 40px);
    font-weight: 600;

    a {
    color: #161616;
      display: inline-block;
      margin-left: 20px;
      margin-top: 10px;
    }
  }
`;
