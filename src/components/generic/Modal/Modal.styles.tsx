import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const slideDown = keyframes`
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(20px); opacity: 0; }
`;

export const ModalOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${({ show }) =>
    show
      ? css`${fadeIn} 0.3s ease-out forwards`
      : css`${fadeOut} 0.3s ease-out forwards`};
`;

export const ModalContainer = styled.div<{ animateOut?: boolean }>`
  background: #ffffff;
  border-radius: 17.57px;
  border: 1.1px solid rgba(0, 0, 0, 0.1);
  padding: 35px;
  position: relative;
  width: 660px;
  height:408px;
  animation: ${({ animateOut }) =>
    animateOut
      ? css`${slideDown} 0.3s ease-out forwards`
      : css`${slideUp} 0.3s ease-out forwards`};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconContainer = styled.div`
  width: 116px;
  height: 116px;
  border-radius: 65.88px;
  background: linear-gradient(
    166.41deg,
    rgba(216, 202, 228, 0.3) 7.05%,
    rgba(216, 202, 228, 0.8) 94.93%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const ModalTitle = styled.h2`
  font-family: "IBM Plex Sans Arabic", sans-serif;sans-serif;;
  font-weight: 800;
  font-size: 26px;
  color: #121212;
  margin: 0 0 36px 0;
`;

export const ModalDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  color: rgba(0, 0, 0, 0.7);
  max-width: 494px;
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 43px;
  width: 100%;
  justify-content: center;
`;

export const ButtonOutline = styled.button`
  width: 240px;
  height: 56px;
  border-radius: 6px;
  font-family: "IBM Plex Sans Arabic", sans-serif;sans-serif;;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  border: 1px solid #00778e;
  color: #00778e;
  text-align: center;

  &:hover {
    background: rgba(0, 119, 142, 0.1);
  }
`;

export const ButtonFilled = styled.button`
  width: 240px;
  height: 56px;
  border-radius: 6px;
  font-family: "IBM Plex Sans Arabic", sans-serif;sans-serif;;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  background: #00778e;
  border: none;
  color: #ffffff;
  text-align: center;

  &:hover {
    background: #006277;
  }
`;
