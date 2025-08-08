import { useTranslation } from "react-i18next";
import styled from "styled-components";

const InvestmentInfo = () => {
  const { t } = useTranslation();

  return (
    <InfoBox>
      <Title>{t("start_investment_journey")}</Title>
      <SubTitle>{t("registration_misa")}</SubTitle>
      <ul>
        <li>
          {t("apply_investment_registration")} <br />
          <a href="#">{t("user_guide_link")}</a>
        </li>
        <li>{t("obtain_temp_certificate")}</li>
        <li>{t("benefit_from_services")}</li>
        <li>{t("contact_investor_care")}</li>
        <li>{t("expand_investments")}</li>
      </ul>
    </InfoBox>
  );
};

export default InvestmentInfo;

// Styled Components
const Title = styled.h1`
  padding-top: clamp(20px, 2.7vh, 30px);
  padding-bottom: clamp(16px, 2vh, 24px);
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: clamp(26px, 1.8vw, 34px);
  font-weight: 700;
  color: #161616;
  opacity: 0.8;
  margin-bottom: clamp(10px, 1vh, 20px);
`;

const SubTitle = styled.h2`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: clamp(20px, 1.5vw, 30px);
  font-weight: 700;
  color: #161616;
  opacity: 90%;
  margin-bottom: clamp(16px, 2vh, 40px);
`;

export const InfoBox = styled.div`
  color: #161616;

  ul {
    padding-top: 30px;
    list-style-type: disc;
    list-style-position: outside;
    padding-left: 20px;
    margin: 0;
  }

  li {
    font-size: clamp(15px, 1.1vw, 16px);
    margin-bottom: clamp(14px, 3vh, 40px);
    font-weight: 500;
    padding-left: 5px;
  }

  a {
    color: #161616;
    display: inline-block;
    margin-top: 10px;
  }
`;
