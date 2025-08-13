import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/common/dashboard/Navbar";
import { styled } from "styled-components";
import investmentBg from "../../assets/images/investment-bg.png";
import StepProgressBar from "./StepProgressBar";
import FooterSectionTop from "../Dashboard/FooterSection";
import InvestmentForm from "./InvestmentForm";
import RegistrationActivityModal from "./RegistrationActivityModal";
import ShareholderSection from "./ShareholderSection";
import ContactPersonForm from "./ContactPersonForm";
import PreviewScreen from "./PreviewScreen";
import dropdownIcon from "../../assets/images/dropdown.svg";
import { InvestmentStepper } from "./InvestmentStepper";
import entityIconSelected from "../../assets/images/investment/enity_icon_selected.svg";
import entityIcon from "../../assets/images/entity-icon.svg";
import stackHolderIcon from "../../assets/images/investment/shareholder_unselected.svg";
import contactIcon from "../../assets/images/contact-icon.svg";
import previewIcon from "../../assets/images/preview-icon.svg";
import RegistrationTypeStep from "./RegistrationTypeStep";
import ShareholderStep from "./ShareholderStep";
import ContactPersonStep from "./ContactPersonStep";
import PreviewScreenStep from "./PreviewScreenStep";

import stackHolderIconSelected from "../../assets/images/investment/shareholder_selected.svg";
import stackHolderIconUnSelected from "../../assets/images/investment/shareholder_unselected.png";

import contactIconSelected from "../../assets/images/investment/contact_person_selected.svg";
import contactIconUnSelected from "../../assets/images/investment/contact_person_unselected.png";

import previewIconSelected from "../../assets/images/investment/preview_selected.svg";
import previewIconUnSelected from "../../assets/images/investment/preview_unselected.png";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Wrapper = styled.div`
  // background-image: linear-gradient(rgba(0, 38, 58, 0.8), rgba(0, 38, 58, 0.8)),
  //   url(${investmentBg});
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
    label: "Entity Information",
    selectedIcon: entityIconSelected,
    unselectedIcon: entityIcon,
    translationKey: "investment.entityInfo",
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
    translationKey: "investment.preview",
  },
];

const InvestmentRegistration: React.FC = () => {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [selectedRegistrationType, setSelectedRegistrationType] = useState<
    string | null
  >(() => {
    return localStorage.getItem("selectedType");
  });

  const entityFormRef = useRef<{ submit: () => void }>(null);
  const contactFormRef = useRef<{ submit: () => void }>(null);
  const previewRef = useRef<{ submit: () => void }>(null);

  const goBack = () => {
    if (currentStep === 0) {
      navigate("/dashboard");
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (selectedRegistrationType)
      localStorage.setItem("selectedType", selectedRegistrationType);
  }, [selectedRegistrationType]);
  const { t } = useTranslation();
  const handleNext = async () => {
    if (currentStep === 0 && entityFormRef.current) {
      entityFormRef.current.submit();
    } else if (currentStep === 2 && contactFormRef.current) {
      await localStorage.setItem("isContactEdit", "false");
      contactFormRef.current.submit();
    } else if (currentStep < 3) {
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
        <InvestmentStepper
          steps={steps}
          activeStep={currentStep}
          onBack={goBack}
        />
      </Wrapper>

      {currentStep === 0 && (
        <RegistrationTypeStep
          selected={selectedRegistrationType}
          setSelected={setSelectedRegistrationType}
          entityFormRef={entityFormRef}
          onSuccess={() => setCurrentStep((prev) => prev + 1)}
        />
      )}
      {currentStep === 1 && <ShareholderStep />}
      {currentStep === 2 && (
        <ContactPersonStep
          contactFormRef={contactFormRef}
          onSuccess={() => setCurrentStep((prev) => prev + 1)}
        />
      )}
      {currentStep === 3 && (
        <PreviewScreenStep
          previewRef={previewRef}
          onEditClick={() => setCurrentStep((prev) => prev - 1)}
        />
      )}

      <Footer>
        <Button
          variant="cancel"
          onClick={() => {
            if (currentStep != 0) {
              setCurrentStep((prev) => prev - 1);
            }
          }}
        >
          {currentStep == 0 ? t("investments.buttons.cancel") : t("investments.buttons.back")}
        </Button>
        <Button variant="next" onClick={handleNext}>
          {t("investments.buttons.next")}
        </Button>
      </Footer>
    </WhiteWrapper>
  );
};

export default InvestmentRegistration;
