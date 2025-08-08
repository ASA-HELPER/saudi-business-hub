import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/dashboard/Navbar";
import { styled } from "styled-components";
import { RHQLicenseStepper } from "./RHQLicenseStepper";

// Icons
import entityIconSelected from "../../assets/images/investment/enity_icon_selected.svg";
import entityIcon from "../../assets/images/entity-icon.svg";
import stackHolderIconSelected from "../../assets/images/investment/shareholder_selected.svg";
import stackHolderIconUnSelected from "../../assets/images/investment/shareholder_unselected.png";
import contactIconSelected from "../../assets/images/investment/contact_person_selected.svg";
import contactIconUnSelected from "../../assets/images/investment/contact_person_unselected.png";
import previewIconSelected from "../../assets/images/investment/preview_selected.svg";
import previewIconUnSelected from "../../assets/images/investment/preview_unselected.png";

import RHQLicenseInformationForm from "./RHQLicenseInformationForm";

const Wrapper = styled.div`
  // background-image: linear-gradient(rgba(0, 38, 58, 0.8), rgba(0, 38, 58, 0.8)),
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
  margin-bottom: 24px;
  margin-right: 100px;
  margin-top: 20px;
`;

const Button = styled.button<{ variant: string }>`
  padding: 10px 24px;
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
    label: "entity infromation",
    selectedIcon: entityIconSelected,
    unselectedIcon: entityIcon,
  },
  {
    label: "Shareholders",
    selectedIcon: stackHolderIconSelected,
    unselectedIcon: stackHolderIconUnSelected,
  },
  {
    label: "Contact Person",
    selectedIcon: contactIconSelected,
    unselectedIcon: contactIconUnSelected,
  },
  {
    label: "Preview",
    selectedIcon: previewIconSelected,
    unselectedIcon: previewIconUnSelected,
  },
];

const RHQLicenseRegistration: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const [currentStep, setCurrentStep] = useState(0);
  const [shareholdersData, setShareholdersData] = useState<any[]>([]);
  const [contactPersonData, setContactPersonData] = useState<any>(null);

  const handleRegistration = (data: any) => {
    console.log("License registration data:", JSON.stringify(data));
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
        <RHQLicenseStepper steps={steps} activeStep={currentStep} />
      </Wrapper>

      {/* Render Step Form */}
      {currentStep === 0 && (
        <RHQLicenseInformationForm registrationTypeId={1} />
      )}

      {/* Future steps can go here... */}
      {/* currentStep === 1 && <RHQAuthorizedPersonsForm /> */}

      <Footer>
        <Button
          variant="cancel"
          onClick={() => {
            if (currentStep !== 0) {
              setCurrentStep((prev) => prev - 1);
            }
          }}
        >
          {currentStep === 0 ? "Cancel" : "Back"}
        </Button>
        <Button
          variant="next"
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep((prev) => prev + 1);
            }
          }}
        >
          Next ➔
        </Button>
      </Footer>
    </WhiteWrapper>
  );
};

export default RHQLicenseRegistration;
