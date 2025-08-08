import styled from 'styled-components';



export const BackButtonWrapper = styled.div`
  position: relative;
`;

export const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px; 
  z-index: 10;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #dcdcdc;
  background-color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: background-color 0.3s ease;

  img {
    width: 22px;
    height: 22px;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  @media (max-width: 820px) {
    width: 40px;
    height: 40px;
  }
`;

