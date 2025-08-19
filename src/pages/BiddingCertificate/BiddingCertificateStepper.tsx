import React from "react";
import styled from "styled-components";
import BackIcon from "../../assets/images/investment/back_icon.svg"; // Updated path
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

type Step = {
  label: string;
  selectedIcon: string;
  unselectedIcon: string;
};

interface BiddingCertificateStepperProps {
  steps: Step[];
  activeStep: number; // 0-based index
}

const Container = styled.div`
  flex-direction: column;
  padding: 20px 40px;
  background: linear-gradient(90deg, #103c5e, #6b368f);
  color: white;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 20px 40px;
  background: linear-gradient(90deg, #103c5e, #6b368f);
  color: white;
`;

const BackArrow = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  font-size: 24px;
  color: white;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-right: 40px;
  align-items: center;
  text-align: center;
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

const StepLabel = styled.div<{ active: boolean }>`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ active }) => (active ? "white" : "#ccc")};
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

const BackIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffffff1a;
  border: "2px solid #FFFFFF1A";
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const BiddingCertificateStepper: React.FC<
  BiddingCertificateStepperProps
> = ({ steps, activeStep }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleBackArrow = () => {
    navigate("/dashboard");
  };

  return (
    <Container>
      <TitleWrapper>
        <BackArrow onClick={handleBackArrow}>
          <img src={BackIcon} alt="Back" />
        </BackArrow>
        <Title>{t("biddingCertificate.registrationTitle")}</Title>{" "}
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
                  alt={step.label}
                  width={60}
                  height={60}
                />
              </StepCircle>
            </StepIconWrapper>
            {index < steps.length - 1 && (
              <Connector active={index < activeStep} />
            )}
            <StepLabel active={index === activeStep}>{step.label}</StepLabel>
          </StepWrapper>
        ))}
      </StepsContainer>
    </Container>
  );
};

export default BiddingCertificateStepper;
