import React from "react";
import styled from "styled-components";
import statusIcon from "../../assets/images/investment-status-icon.svg";
import { useTranslation } from "react-i18next";

const Container = styled.div<{ $isRTL: boolean }>`
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #4e2d92, #0d827e);
  border-radius: 16px;
  padding: 20px 24px;
  color: #fff;
  width: 100%;
  max-width: 1680px;
  height: 120px;
  box-sizing: border-box;
  overflow: hidden;
  margin-bottom: 20px;
  direction: ${({ $isRTL }) => ($isRTL ? 'rtl' : 'ltr')};
`;

const IconWrapper = styled.div`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;

  img {
    width: 60px;
    height: 60px;
  }
`;

const Message = styled.p<{ $isRTL: boolean }>`
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
  font-weight: 600;
  font-size: 20px;
  line-height: 1.4;
  margin: 0;
  text-align: ${({ $isRTL }) => ($isRTL ? 'right' : 'left')};
`;

const InvestmentBanner: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <Container $isRTL={isRTL}>
      <IconWrapper>
        <img src={statusIcon} alt={t("investment_banner.icon_alt")} />
      </IconWrapper>
      <Message $isRTL={isRTL}>
        {t("investment_banner.message")}
      </Message>
    </Container>
  );
};

export default InvestmentBanner;