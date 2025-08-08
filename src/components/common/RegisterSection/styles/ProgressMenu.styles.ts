import styled from 'styled-components';

export const RegisterContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 100vh;
`;

export const StepperWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  width: 100%;
  max-width: 700px;
  padding: 0 20px;
`;

export const StepBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%; // each step takes equal horizontal space
  text-align: center;
  z-index: 1;
`;

export const StepCircle = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  transition: 0.3s ease-in-out;

  img {
    width: 50px;
    height: 50px;
  }
`;

export const StepTitle = styled.div<{ isActive: boolean }>`
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: 16px;
  margin-top: 8px;
  color: ${({ isActive }) => (isActive ? '#121212' : '#7E929F')};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
`;

export const StepLine = styled.div<{ isActive: boolean }>`
  position: absolute;
  top: 25px; // vertically center between circles
  left: 25%;
  width: 50%;
  height: 2px;
  background-color: ${({ isActive }) => (isActive ? '#00778E' : '#7E929F')};
  z-index: 0;
`;
