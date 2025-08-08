import styled from 'styled-components';

export const ContactSection = styled.section`
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
`;

export const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
  padding: 2.25rem 1.5rem 1.5rem;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  background: linear-gradient(137deg, rgba(27, 58, 96, 1) 0%, rgba(115, 64, 142, 1) 100%);
`;

export const BackgroundPattern = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

export const SectionTitle = styled.h2`
  position: relative;
  font-family: '29LT_Bukra-SmBd', Helvetica;
  font-weight: normal;
  color: white;
  font-size: 1.625rem;
  line-height: 2.375rem;
  letter-spacing: 0;
`;

export const ContactCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2.25rem;
  position: relative;
  width: 100%;
`;

export const ContactCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 8.75rem;
  align-items: flex-start;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem 2.25rem;
  position: relative;
  width: 100%;
  border-radius: 0.625rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px) brightness(100%);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0;
  width: 100%;
`;

export const IconContainer = styled.div`
  position: relative;
  width: 4.375rem;
  height: 4.375rem;
  background-color: rgba(255, 255, 255, 0.12);
  border-radius: 5.46875rem;
  overflow: visible;
  border: none;
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px) brightness(100%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2.25rem;
    height: 2.25rem;
  }

  img {
    width: 2.25rem;
    height: 2.25rem;
  }
`;

export const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.375rem;
  flex: 1;
`;

export const ContactTitle = styled.div`
  position: relative;
  width: fit-content;
  margin-top: -0.0625rem;
  opacity: 0.8;
  font-family: '29LT_Bukra-Regular', Helvetica;
  font-weight: normal;
  color: white;
  font-size: 1rem;
  line-height: 1.4625rem;
  letter-spacing: 0;
  white-space: nowrap;
`;

export const ContactValue = styled.div`
  position: relative;
  align-self: stretch;
  font-family: '29LT_Bukra-SmBd', Helvetica;
  font-weight: normal;
  color: white;
  font-size: 1.125rem;
  line-height: 1.64375rem;
  letter-spacing: 0;
`;

export const BottomDecoration = styled.img`
  position: absolute;
  width: 100%;
  height: 16.9375rem;
  bottom: 0;
  left: 0;
`;