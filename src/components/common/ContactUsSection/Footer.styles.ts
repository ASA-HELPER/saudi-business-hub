import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  background-color: #f8f9fa;
  padding: 60px 40px 20px;
  color: #333;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 30px;
  margin-bottom: 40px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterSection = styled.div``;

export const SectionHeading = styled.h3`
  color: #02778f;
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 600;
`;

export const SectionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SectionListItem = styled.li`
  margin-bottom: 10px;
`;

export const StyledLink = styled.a`
  color: #02778f;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;

  &:hover {
    color:#02778f
  }
`;

export const FooterBottom = styled.div`
  border-top: 1px solid #ddd;
  padding-top: 30px;
`;

export const SocialMedia = styled.div`
  margin-bottom: 30px;
`;

export const Accessibility = styled.div`
  margin-bottom: 30px;
`;

export const SocialIcons = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const AccessibilityIcons = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

export const StyledText = styled.p`
  font-size: 14px;
  color: #02778f;
`;

export const LegalLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    color: #02778f;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
      color: #02778f; 
    }
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

export const StyledImage = styled.img`
  height: 40px;
  width: auto;
`;

export const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #02778f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003d7a;
  }
`;

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

export const Copyright = styled.span`
font-size: 14px;
  color: #02778f;
`;