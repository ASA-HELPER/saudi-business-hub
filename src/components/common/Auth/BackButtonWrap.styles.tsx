import styled from 'styled-components';

export const BackButtonWrapper = styled.div`
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  top: clamp(12px, 2vw, 20px);
  left: clamp(12px, 2vw, 20px);
  z-index: 10;
  width: clamp(40px, 3.5vw, 50px);
  height: clamp(40px, 3.5vw, 50px);
  border-radius: 50%;
  border: 1px solid #dcdcdc;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  img {
    width: clamp(16px, 1.6vw, 22px);
    height: clamp(16px, 1.6vw, 22px);
  }

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

export const FooterFixedWrapper = styled.div`
  position: fixed;
  bottom: clamp(8px, 1.5vh, 16px);
  width: clamp(280px, 25vw, 320px);
  z-index: 9;

  @media (max-width: 768px) {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
  }
`;
