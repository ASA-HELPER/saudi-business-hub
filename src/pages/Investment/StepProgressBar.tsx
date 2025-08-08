import React from "react";
import styled from "styled-components";
import entityIcon from "../../assets/images/entity-icon.svg";
import stackHolderIcon from "../../assets/images/stackholder-icon.svg";
import contactIcon from "../../assets/images/contact-icon.svg";
import previewIcon from "../../assets/images/preview-icon.svg";

const ProgressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eff3f5;
  padding: 4rem;
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

const StepCircle = styled.div<{
  isCompleted: boolean;
  isActive: boolean;
}>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${({ isCompleted }) =>
    isCompleted ? "#0d9488" : "transparent"};
  border: ${({ isActive, isCompleted }) =>
    isCompleted
      ? "none"
      : isActive
      ? "3px solid #0d9488"
      : "3px solid transparent"};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 40px;
    height: 40px;
    filter: ${({ isCompleted, isActive }) =>
      isCompleted || isActive ? "none" : "grayscale(100%)"};
  }
`;

const StepLabel = styled.div<{ isActive: boolean }>`
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: ${({ isActive }) => (isActive ? "#000" : "#6b7280")};
  text-align: center;
`;

const StepLine = styled.div`
  position: absolute;
  top: 45%;
  left: 8%;
  right: 8%;
  height: 2px;
  background: #cbd5e1;
  transform: translateY(-50%);
  z-index: 0;
`;

const steps = [
  { label: "Entity Information", icon: entityIcon },
  { label: "Shareholders", icon: stackHolderIcon },
  { label: "Contact Person", icon: contactIcon },
  { label: "Preview", icon: previewIcon },
];

type Props = {
  currentStep: number;
};

const StepProgressBar: React.FC<Props> = ({ currentStep }) => {
  return (
    <ProgressContainer>
      <StepLine />
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <StepWrapper key={step.label}>
            <StepCircle isCompleted={isCompleted} isActive={isActive}>
              <img src={step.icon} alt={step.label} />
            </StepCircle>
            <StepLabel isActive={isActive}>{step.label}</StepLabel>
          </StepWrapper>
        );
      })}
    </ProgressContainer>
  );
};

export default StepProgressBar;
