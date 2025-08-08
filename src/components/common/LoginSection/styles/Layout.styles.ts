import styled from 'styled-components';

export const LayoutContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;  
  margin: 0 auto;
  background-color: #f9f9f9;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;
  min-height: 500px;

  @media (max-width: 768px) {
    flex-direction: column;
    min-height: auto;
  }
`;

export const LeftSection = styled.div`
  width: 50%;
  border-radius: 10px;
  background-color: #B0D5DC;
  padding: 0px 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

export const RightSection = styled.div`
  width: 50%;
  padding: 0px 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;
