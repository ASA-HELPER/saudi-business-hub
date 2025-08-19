import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/common/dashboard/Navbar";
import { styled } from "styled-components";

// Icons
import entityIconSelected from "../../assets/images/investment/enity_icon_selected.svg";
import entityIcon from "../../assets/images/entity-icon.svg";
import stackHolderIconSelected from "../../assets/images/investment/shareholder_selected.svg";
import stackHolderIconUnSelected from "../../assets/images/investment/shareholder_unselected.png";
import contactIconSelected from "../../assets/images/investment/contact_person_selected.svg";
import contactIconUnSelected from "../../assets/images/investment/contact_person_unselected.png";
import previewIconSelected from "../../assets/images/investment/preview_selected.svg";
import previewIconUnSelected from "../../assets/images/investment/preview_unselected.png";
import StrategicInvestorStepper from "./StrategicInvestorStepper";
import StrategicInvestorEntityStep from "./StrategicInvestorEntityStep";

const Wrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WhiteWrapper = styled.div`
  background-color: white;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 0px 20px;
  padding-bottom: 20px;
  background-color: #f5f5f5;
  align-self: right;
`;

const Button = styled.button<{ variant: string }>`
  padding: 10px 10px;
  padding: ${({ variant }) => (variant === "back" ? "10px 45px" : "10px 15px")};
  border-radius: 3px;
  border: ${({ variant }) =>
    variant === "back" ? "1px solid #007c92" : "none"};
  color: ${({ variant }) => (variant === "back" ? "#007c92" : "#fff")};
  background-color: ${({ variant }) =>
    variant === "back" ? "#fff" : "#00778E"};
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const steps = [
  {
    label: "Entity Information",
    selectedIcon: entityIconSelected,
    unselectedIcon: entityIcon,
  },
  {
    label: "Shareholders",
    selectedIcon: stackHolderIconSelected,
    unselectedIcon: stackHolderIconUnSelected,
    translationKey: "investment.shareholders",
  },
  {
    label: "Contact Person",
    selectedIcon: contactIconSelected,
    unselectedIcon: contactIconUnSelected,
    translationKey: "investment.contactPerson",
  },
  {
    label: "Preview",
    selectedIcon: previewIconSelected,
    unselectedIcon: previewIconUnSelected,
  },
];

const StrategicInvestorRegistration: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [currentStep, setCurrentStep] = useState(0);
  const entityFormRef = useRef<{ submit: () => void }>(null);
  const previewRef = useRef<{ submit: () => void }>(null);
  const contactFormRef = useRef<{ submit: () => void }>(null);
  const shareholderFormRef = useRef<{ submit: () => void }>(null);

  const handleNext = async () => {
    if (currentStep === 0 && entityFormRef.current) {
      entityFormRef.current.submit();
    } else if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <WhiteWrapper>
      <Wrapper>
        <Navbar
          language={language}
          setLanguage={setLanguage}
          backgroundColor="#ffffff"
          isDarkBackground={false}
        />
        <StrategicInvestorStepper steps={steps} activeStep={currentStep} />
      </Wrapper>

      {/* Render Step Form */}
      {currentStep === 0 && (
        <StrategicInvestorEntityStep
          entityFormRef={entityFormRef}
          onSuccess={() => setCurrentStep((prev) => prev + 1)}
        />
      )}

      <Footer>
        <Button
          variant="back"
          onClick={() => {
            if (currentStep !== 0) {
              setCurrentStep((prev) => prev - 1);
            }
          }}
        >
          Back
        </Button>
        <Button variant="next" onClick={handleNext}>
          {currentStep === 0 ? "Save & Next ➔" : "Submit"}
        </Button>
      </Footer>
    </WhiteWrapper>
  );
};

export default StrategicInvestorRegistration;
