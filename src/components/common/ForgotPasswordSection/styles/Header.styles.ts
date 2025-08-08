import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* or center if you want back button centered */
  width: 100%;
  padding: 20px;
  background-color: inherit;
`;

export const BackButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

export const BackButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #dcdcdc;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 820px) {
    width: 40px;
    height: 40px;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: 30px;
  text-transform: uppercase;
  color: #121212;
  text-align: center;
  width: 100%;

  @media (max-width: 820px) {
    font-size: 22px;
  }
`;
