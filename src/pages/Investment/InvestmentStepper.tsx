import React from "react";
import styled from "styled-components";
import BackIcon from "../../assets/images/investment/back_icon.svg";
import { useTranslation } from "react-i18next";

type Step = {
  label: string;
  selectedIcon: string;
  unselectedIcon: string;
  translationKey: string; 
};

interface InvestmentStepperProps {
  steps: Step[];
  activeStep: number;
  onBack?: () => void;
  language?: "en" | "ar"; 
}

const Container = styled.div<{ $isRTL?: boolean }>`
  flex-direction: column;
  padding: 20px 40px;
  background: linear-gradient(90deg, #103c5e, #6b368f);
  color: white;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const TitleWrapper = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};
  padding: 20px 40px;
  background: linear-gradient(90deg, #103c5e, #6b368f);
  color: white;
`;

const BackArrow = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  align-items: center;
  margin-right: ${(props) => (props.$isRTL ? "0" : "20px")};
  margin-left: ${(props) => (props.$isRTL ? "20px" : "0")};
  cursor: pointer;
  font-size: 24px;
  color: white;
`;

const Title = styled.h1<{ $isRTL?: boolean }>`
  font-size: 20px;
  font-weight: bold;
  margin-right: ${(props) => (props.$isRTL ? "0" : "40px")};
  margin-left: ${(props) => (props.$isRTL ? "40px" : "0")};
  align-items: center;
  text-align: center;
  font-family: ${(props) => props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: space-between;
  margin-top: 20px;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
`;

const StepIconWrapper = styled.div<{ active: boolean }>`
  width: 105px;
  height: 105px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#FFFFFF1A" : "transparent")};
  border: ${({ active }) => (active ? "2px solid #FFFFFF1A" : "none")};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StepCircle = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #00b4d8;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const StepLabel = styled.div<{ active: boolean; $isRTL?: boolean }>`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ active }) => (active ? "white" : "#ccc")};
  font-family: ${(props) => props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const Connector = styled.div<{ active: boolean }>`
  position: absolute;
  top: 50px;
  left: 50%;
  right: -50%;
  height: 2px;
  background-color: ${({ active }) => (active ? "white" : "#666")};
  z-index: 0;
`;

export const InvestmentStepper: React.FC<InvestmentStepperProps> = ({
  steps,
  activeStep,
  onBack,
  language = "en",
}) => {
  const { t } = useTranslation();
  const isRTL = language === "ar";

  return (
    <Container $isRTL={isRTL}>
      <TitleWrapper $isRTL={isRTL}>
        <BackArrow $isRTL={isRTL} onClick={onBack}>
          <img src={BackIcon} alt={t("common.back")} />
        </BackArrow>
        <Title $isRTL={isRTL}>{t("investment.registrationTitle")}</Title>
      </TitleWrapper>
      <StepsContainer>
        {steps.map((step, index) => (
          <StepWrapper key={index}>
            <StepIconWrapper active={index === activeStep}>
              <StepCircle>
                <img
                  src={
                    index <= activeStep
                      ? step.selectedIcon
                      : step.unselectedIcon
                  }
                  alt={t(step.translationKey)}
                  width={60}
                  height={60}
                />
              </StepCircle>
            </StepIconWrapper>
            {index < steps.length - 1 && (
              <Connector active={index < activeStep} />
            )}
            <StepLabel active={index === activeStep} $isRTL={isRTL}>
              {t(step.translationKey)}
            </StepLabel>
          </StepWrapper>
        ))}
      </StepsContainer>
    </Container>
  );
};