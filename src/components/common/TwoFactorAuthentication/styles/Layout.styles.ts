import styled from 'styled-components';

export const LayoutContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 40px 16px 24px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
`;

export const Content = styled.div`
  width: 100%;
  max-width: clamp(320px, 90%, 568px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
