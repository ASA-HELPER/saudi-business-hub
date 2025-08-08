import styled from 'styled-components';

export const FooterContainer = styled.div`
    margin-top: 40px;
`;

export const FooterSection = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 4px;
  justify-content: center;
`;

export const StyledLink = styled.a`
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-size: clamp(12px, 1.2vw, 16px);
  font-weight: 600;
  color: #00778e;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const TroubleText = styled.span`
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: clamp(12px, 1.2vw, 16px);
  color: #3e4448;
`;
