import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";
import successImage from "../../../assets/images/register/success-icon.png";
import loginArrow from "../../../assets/images/register/login-arrow.png";

interface SuccessMessageProps {
  onLogin?: () => void;
  onInvestClick?: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  onLogin = () => {},
  onInvestClick = () => {},
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <SuccessMessageContainer>
      <ContentContainer>
        <SuccessContent>
          <Title>{t('register.success.title')}</Title>
          <MessageContainer>
            <SuccessImage>
              <img src={successImage} alt={t('register.success.title')} width="538" height="206" />
            </SuccessImage>
            <MessageText>
              <Trans i18nKey="register.success.message" components={{ br: <br /> }} />
            </MessageText>
          </MessageContainer>
          <ButtonGroup>
            <StyledButton
              className="invest-button"
              onClick={() => navigate("/home")}
            >
              {t('register.success.invest_button')}
            </StyledButton>
            <StyledButton
              className="login-button"
              onClick={() => navigate("/login")}
            >
              {t('register.success.login_button')}
              <StyledIcon src={loginArrow} alt="arrow" />
            </StyledButton>
          </ButtonGroup>
        </SuccessContent>
      </ContentContainer>
    </SuccessMessageContainer>
  );
};

const SuccessMessageContainer = styled.div`
  padding: clamp(40px, 6vw, 80px) clamp(16px, 3vw, 24px) clamp(30px, 5vh, 40px);
  width: 100%;
  max-width: clamp(340px, 80vw, 772px);
  min-height: clamp(600px, 80vh, 960px);
  margin: 0 auto;
`;

const SuccessContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 4vh, 40px);
  width: 100%;
  max-width: clamp(320px, 90vw, 700px);
  padding-top: clamp(20px, 4vh, 30px);
  margin: 0 auto;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

const Title = styled.h1`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 600;
  font-size: clamp(20px, 2.5vw, 32px);
  line-height: 1.4;
  text-align: center;
  color: #121212;
  margin: 0;
  text-transform: camelcase;
`;

const MessageText = styled.p`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 400;
  font-size: clamp(16px, 2vw, 20px);
  text-align: center;
  color: #3e4448;
  margin: 0;
  line-height: 1.5;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 538px;
  margin: 0 auto;
`;

const SuccessImage = styled.div`
  width: 100%;
  max-width: clamp(280px, 80vw, 538px);
  height: clamp(150px, 20vh, 206px);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 538px;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  flex: 1;
  height: 56px;
  padding: 10px 16px;
  border-radius: 6px;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.3s ease;

  &.invest-button {
    background: #ffffff;
    color: #161616;
    border: 1.6px solid #00778e;
  }

  &.invest-button:hover {
    background: #f0f8fa;
  }

  &.login-button {
    background: #00778e;
    color: #ffffff;
    border: none;
  }

  &.login-button:hover {
    background: #005f71;
  }
`;

const StyledIcon = styled.img`
  margin-left: 6px;
  width: 24px;
  height: 24px;
`;

export default SuccessMessage;
