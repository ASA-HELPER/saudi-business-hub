import styled from "styled-components";

const HelpSectionWrapper = styled.div`
  background: white;
  padding: 6rem 2rem 4rem;
  position: relative;
  //margin-bottom: 150px;
`;

// Gradient Contact Panel
const HelpSection = styled.section`
  background: linear-gradient(90deg, #0c4a6e, #702877);
  border-radius: 12px;
  padding: 2.5rem 2rem;
  color: white;
  width: 80%;
  //max-width: 1280px;
  margin: 0 auto;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  z-index: 10;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

const HelpHeading = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.08);
`;

const HelpSubtext = styled.div`
  font-size: 1rem;
  margin-top: 0.5rem;
  font-weight: 400;
`;

const ContactOptions = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  margin-top: 20px;
`;

const ContactItem = styled.div`
  flex: 1;
  min-width: 200px;
  text-align: center;
`;

const ContactLabel = styled.div`
  font-size: 1rem;
  margin: 0.5rem 0;
`;

const ContactValue = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
`;

// Footer Grid
const FooterWrapper = styled.footer`
  background-color: #f4f7f9;
  padding: 4rem 2rem 2rem;
`;

const FooterGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  justify-content: space-between;
  max-width: 1280px;
  margin: 0 auto;
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 180px;
`;

const FooterTitle = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e3e6ea;
  padding-bottom: 0.5rem;
`;

const FooterLink = styled.div`
  margin: 0.4rem 0;
  font-size: 0.95rem;
  color: #0a1f2e;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  img {
    width: 30px;
    height: 30px;
    background: white;
    padding: 6px;
    border-radius: 6px;
  }
`;

const AccessibilityIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;

  img {
    width: 30px;
    height: 30px;
    background: white;
    padding: 6px;
    border-radius: 6px;
  }
`;

const FooterBottom = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #ddd;
  font-size: 0.85rem;
  text-align: center;
  color: #6c757d;
`;

const SectionHeader = styled.div`
  display: flex;
  //justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 48px;
  position: relative;
  padding-left: 24px;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #121212;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 22px;
  color: #555555;
  font-weight: 600;
`;

const FooterSectionTop = () => {
  return (
    <HelpSectionWrapper>
      <HelpSection>
        <HelpHeading>
          HOW WE CAN HELP YOU
          <HelpSubtext>
            Empowering you with reliable services and personalized support.
          </HelpSubtext>
        </HelpHeading>

        <ContactOptions>
          <ContactItem>
            <div>📞</div>
            <ContactLabel>Local</ContactLabel>
            <ContactValue>8002449990</ContactValue>
          </ContactItem>
          <ContactItem>
            <div>🌐</div>
            <ContactLabel>International</ContactLabel>
            <ContactValue>00966115065777</ContactValue>
          </ContactItem>
          <ContactItem>
            <div>✉️</div>
            <ContactLabel>Email</ContactLabel>
            <ContactValue>InvestorCare@misa.gov.sa</ContactValue>
          </ContactItem>
        </ContactOptions>
      </HelpSection>
    </HelpSectionWrapper>
  );
};

export default FooterSectionTop;
