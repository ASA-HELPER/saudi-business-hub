import React from "react";
import styled from "styled-components";
import BackIcon from "../../../assets/images/investment/back_icon.svg";
import { useNavigate } from "react-router-dom";

interface StepperProps {
  activeStep: number;
  onBack?: () => void; // Optional callback for back navigation
}

const stepLabels = [
  "Section",
  "Division",
  "Group",
  "Class",
  "Branch",
  "Activity",
];

const StepperContainer = styled.div`
  background: linear-gradient(90deg, #103c5e, #6b368f);
  padding: 24px 32px;
  color: white;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
`;

const BackArrow = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  font-size: 24px;
  color: white;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
`;

const StepsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  z-index: 1;
`;

const StepCircle = styled.div<{ $active: boolean; $completed: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ $active, $completed }) =>
    $completed
      ? "#E5F5F8"
      : $active
      ? "rgba(255, 255, 255, 0.15)"
      : "transparent"};
  border: 2px solid white;
  color: ${({ $active, $completed }) => ($completed ? "#00778E" : "#ffffff")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  z-index: 2;

  ${({ $active }) =>
    $active &&
    `
    box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.15);
  `}
`;

const Connector = styled.div<{ $completed: boolean }>`
  position: absolute;
  top: 17px;
  left: 50%;
  transform: translateX(18px); /* half of circle + offset */
  width: calc(100% - 36px);
  height: 2px;
  background-color: ${({ $completed }) =>
    $completed ? "#ffffff" : "#ffffff80"};
  z-index: 0;
`;

const StepLabel = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: white;
  text-align: center;
`;

type TopStepperProps = {
  activeStep: number;
  onBack: () => void;
};


const TopStepper: React.FC<TopStepperProps> = ({ activeStep, onBack }) => {
  return (
    <StepperContainer>
      <TopRow>
        <BackArrow onClick={onBack}>
          <img src={BackIcon} alt="Back" />
        </BackArrow>
        <Title>Registration Business Activities</Title>
      </TopRow>

      <StepsRow>
        {stepLabels.map((label, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <StepWrapper key={index}>
              <StepCircle $active={isActive} $completed={isCompleted}>
                {index + 1}
              </StepCircle>

              {index < stepLabels.length - 1 && (
                <Connector $completed={index < activeStep} />
              )}

              <StepLabel>{label}</StepLabel>
            </StepWrapper>
          );
        })}
      </StepsRow>
    </StepperContainer>
  );
};

export default TopStepper;
