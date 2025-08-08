import { motion } from 'framer-motion';
import styled from 'styled-components';

export const BackgroundWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: 
    linear-gradient(
      189.27deg,
      rgba(18, 123, 126, 0.8) 11.82%,
      rgba(23, 116, 125, 0.8) 22.03%,
      rgba(63, 54, 121, 0.8) 39.14%,
      rgba(18, 123, 126, 0.8) 98.44%
    ),
    url('/assets/images/background-image.png') no-repeat center/cover;
  background-size: cover;
  background-position: center;
  padding: 0;
`;

export const TopRight = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;

export const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


export const CenterCard = styled.div<{ $leftSpace: string; $rightSpace: string }>`
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  padding: clamp(20px, 4vh, 40px);
  width: calc(100% - ${({ $leftSpace }) => $leftSpace} - ${({ $rightSpace }) => $rightSpace});
  height: auto;
  overflow: hidden; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    width: 90%;
    padding: clamp(16px, 4vh, 24px);
    max-height: clamp(400px, 75vh, 740px);
  }
`;
