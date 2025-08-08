import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-color: inherit;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const LeftSection = styled.div`
  width: 60%;
  height: 100%;
  padding: clamp(20px, 4vw, 80px);
  display: flex;
  flex-direction: column;
  background: url('/assets/images/background-image.png') center/cover no-repeat;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      189.27deg,
      rgba(18, 123, 126, 0.8) 11.82%,
      rgba(23, 116, 125, 0.8) 22.03%,
      rgba(63, 54, 121, 0.8) 39.14%,
      rgba(18, 123, 126, 0.8) 98.44%
    );
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
    padding: clamp(20px, 5vw, 30px);
  }
`;

export const RightSection = styled.div`
  position: relative;
  width: 40%;
  height: 100%;
  background: rgba(15, 30, 35, 0.5);
  display: flex;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

export const LanguageSwitch = styled.div`
  display: flex;
  height: clamp(36px, 5.5vh, 56px);         // min: 36px, max: 56px
  width: clamp(126px, 12vw, 180px);         // min: 126px, max: 180px
  background: rgba(15, 30, 35, 0.5);
  border-radius: 6px;
  padding: clamp(4px, 1vh, 10px);
  margin-bottom: clamp(12px, 2vh, 24px);
  z-index: 1;
`;



export const LanguageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  margin-top: -2px;
  height: clamp(28px, 4vh, 40px);                      
  padding: 0 clamp(10px, 1.6vw, 16px);                 
  border: none;
  border-radius: 6px;
  background: ${({ active }) => (active ? 'rgba(255, 255, 255, 0.1)' : 'transparent')};
  color: #ffffff;
  font-weight: ${({ active }) => (active ? 500 : 300)};
  font-size: clamp(13px, 1.2vw, 16px);            
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.44);
  }
`;



export const InvestmentInfo = styled.div`
  color: #fff;
  position: relative;
  z-index: 1;
  width: clamp(674px, 49.3vw, 947px);   // 1366px = 674px, 1920px = 947px
  height: clamp(440px, 57.4vh, 620px);  // 766px = 440px, 1080px = 620px
`;

export const Title = styled.h1`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  padding-top: clamp(20px, 2.7vh, 30px);
  padding-bottom: clamp(16px, 2vh, 24px);
  font-size: clamp(26px, 1.8vw, 34px);  // 1366px = 26px, 1920px = 34px
  font-weight: 700;
  color: #fff;
  opacity: 0.8;
  font-style: bold;
  margin-bottom: clamp(10px, 1vh, 20px);
`;

export const SubTitle = styled.h2`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: clamp(20px, 1.5vw, 30px);
  font-weight: 700;
  color: #fff;
  opacity: 0.8;
  font-style: bold;
  margin-bottom: clamp(16px, 2vh, 24px);
`;

export const InfoBox = styled.div`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  background: rgba(15, 30, 35, 0.5);
  border-radius: 10px;
  padding: clamp(20px, 2.3vw, 30px) clamp(30px, 3vw, 50px);
  font-style: medium;


  ul {
    padding-left: 5px;
    margin: 0;
    list-style-position: inside;
  }

  li {
    font-size: clamp(15px, 1.1vw, 16px);
    margin-bottom: clamp(14px, 3vh, 40px);
    font-weight: 500;

    a {
      display: inline-block;
      margin-left: 20px;
      margin-top: 10px;
      color: #fff;
    }
  }
`;


export const BottomLeftSVGWrapper = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  z-index: 999;

  img {
    width: clamp(60%, 80%, 90%);
    height: auto;
  }

  @media (max-height: 760px) {
    img {
      width: clamp(50%, 60%, 70%);
    }
  }
`;
