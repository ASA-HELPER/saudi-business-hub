import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/common/dashboard/Navbar";
import { styled } from "styled-components";

// Icons
import entityIconSelected from "../../assets/images/investment/enity_icon_selected.svg";
import entityIcon from "../../assets/images/entity-icon.svg";
import previewIconSelected from "../../assets/images/investment/preview_selected.svg";
import previewIconUnSelected from "../../assets/images/investment/preview_unselected.png";
import { BiddingCertificateStepper } from "./BiddingCertificateStepper";
import EntityInformationSection from "./EntityInformationSection";

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
  padding-bottom: 10px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 10px;
  align-self: right;
`;

const Button = styled.button<{ variant: string }>`
  padding: 10px 40px;
  border-radius: 6px;
  border: ${({ variant }) =>
    variant === "cancel" ? "1px solid #007c92" : "none"};
  color: ${({ variant }) => (variant === "cancel" ? "#007c92" : "#fff")};
  background-color: ${({ variant }) =>
    variant === "cancel" ? "#fff" : "#00778E"};
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
    label: "Preview",
    selectedIcon: previewIconSelected,
    unselectedIcon: previewIconUnSelected,
  },
];

const BiddingCertificateRegistration: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [currentStep, setCurrentStep] = useState(0);
  const bidEntityFormRef = useRef<{ submit: () => void }>(null);
  const previewRef = useRef<{ submit: () => void }>(null);

  const handleNext = async () => {
    if (currentStep === 0 && bidEntityFormRef.current) {
      bidEntityFormRef.current.submit();
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
        <BiddingCertificateStepper steps={steps} activeStep={currentStep} />
      </Wrapper>

      {/* Render Step Form */}
      {currentStep === 0 && (
        <EntityInformationSection
          bidEntityFormRef={bidEntityFormRef}
          onSuccess={() => setCurrentStep((prev) => prev + 1)}
        />
      )}

      <Footer>
        <Button
          variant="cancel"
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

export default BiddingCertificateRegistration;
