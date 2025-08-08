import styled from 'styled-components';

export const FooterContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 320px;
    gap: 18px;
    padding: 12px;
    border-radius: 6px;
    font-family: 'IBM Plex Sans Arabic', sans-serif;
    bottom: 2px;
    right: -2px;
`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 4px;
  justify-content: center;
`;

export const StyledLink = styled.a`
  font-size: 18px;
  font-weight: 600;
  color: #00778e;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const TroubleText = styled.span`
  font-size: 18px;
  font-weight: 400;
  color: #3e4448;
`;
