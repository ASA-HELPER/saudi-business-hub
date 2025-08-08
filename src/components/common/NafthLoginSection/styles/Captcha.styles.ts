// styles/Captcha.styles.ts
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CaptchaContainer = styled(motion.div)`
  position: absolute;
  bottom: 10px;
  right: 0px;
  z-index: 9999;

  min-width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const CaptchaFrame = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  border: 1px solid #DCDCDC;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 10px;
  box-sizing: border-box;
`;

export const CaptchaLogo = styled.img`
  width: 42px;
  object-fit: contain;
`;

export const PrivacyTerms = styled.span`
  font-size: 10px;
  font-weight: 500;
  color: #A6A6A6;
  text-align: center;
`;
