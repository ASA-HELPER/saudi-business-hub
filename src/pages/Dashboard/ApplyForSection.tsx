import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FileText, TrendingUp, Shield, ArrowRight } from "lucide-react";
import TermsModal from "./TermsModal2";
import InvestmentBanner from "./InvestmentBanner";
import TermsModal2 from "./TermsModal2";
import GccNationalModal from "../Investment/modal/GccNationalModal";
import { useNavigate } from "react-router-dom";
import BoxCurveSpan from "../../assets/images/box-corner.svg";
import RegisterIcon from "../../assets/images/register-stepper-icon.svg";
import FormIcon from "../../assets/images/form-stepper-icon.svg";
import ApprovalIcon from "../../assets/images/approval-stepper-icon.svg";
import ServicesIcon from "../../assets/images/services-stepper-icon.svg";

import MisaInvIconSelected from "../../assets/images/applyfor/app_1_selected.svg";
import MisaInvIconUnSelected from "../../assets/images/applyfor/app_1_unselected.svg";

import RhqIconSelected from "../../assets/images/applyfor/app_2_selected.svg";
import RhqIconUnSelected from "../../assets/images/applyfor/app_2_unselected.svg";

import StrategyIconSelected from "../../assets/images/applyfor/app_3_selected.svg";
import StrategyIconUnSelected from "../../assets/images/applyfor/app_3_unselected.svg";

import BindingIconSelected from "../../assets/images/applyfor/app_4_selected.svg";
import BindingIconUnSelected from "../../assets/images/applyfor/app_4_unselected.svg";
import { useTranslation } from "react-i18next";

// Keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Main container
const SectionContainer = styled.div<{ $isRTL?: boolean }>`
  margin: 0 auto;
  padding: 2rem 5rem;
  animation: ${fadeInUp} 0.8s ease-out;
  background-color: #ffffff;
  direction: ${({ $isRTL }) => ($isRTL ? "rtl" : "ltr")};
`;

const SectionHeader = styled.div<{ $isRTL?: boolean }>`
  margin-bottom: 28px;
  position: relative;
  padding-${({ $isRTL }) => ($isRTL ? "right" : "left")}: 24px;
  margin-top: 20px;

  &::before {
    content: "";
    position: absolute;
    ${({ $isRTL }) => ($isRTL ? "right" : "left")}: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h1<{ $isRTL?: boolean }>`
  font-family: ${({ $isRTL }) =>
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : "inherit"};
  font-size: 28px;
  font-weight: 700;
  color: #121212;
  margin-bottom: 8px;
  text-align: ${({ $isRTL }) => ($isRTL ? "right" : "left")};

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled.p<{ $isRTL?: boolean }>`
  font-family: ${({ $isRTL }) =>
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : "inherit"};
  font-size: 18px;
  color: #555555;
  font-weight: 600;
  text-align: ${({ $isRTL }) => ($isRTL ? "right" : "left")};
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 45% 55%;
  gap: 48px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  background: #eff3f5;
  border-radius: 16px;
  padding: 32px;
  //box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const OptionCard = styled.div<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 14px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  //border: 2px solid ${(props) =>
    props.isActive ? "#0891b2" : "transparent"};
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(135deg, #036274 0%, #0891b2 100%)"
      : "#EFF3F5"};

  color: ${(props) => (props.isActive ? "white" : "#1a1a1a")};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${(props) =>
      props.isActive
        ? "0 25px 50px rgba(8, 145, 178, 0.3)"
        : "0 8px 25px rgba(0, 0, 0, 0.1)"};
  }

  &:active {
    transform: translateY(-2px);
  }
`;

const OptionIconWrapper = styled.div<{ isActive?: boolean }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isActive
      ? "rgba(255, 255, 255, 0.2)"
      : "linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)"};
  backdrop-filter: blur(8px);
  flex-shrink: 0;
`;

const OptionContent = styled.div`
  flex: 1;
`;

const OptionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
`;

const OptionDescription = styled.p`
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.5;
`;

const TimelineConnector = styled.div<{ $activeIndex: number }>`
  position: absolute;
  right: -25px;
  top: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(135deg, #0891b2 0%, #00778e 100%);

  &::before {
    content: "";
    position: absolute;
    top: ${({ $activeIndex }) =>
      `calc(${100 * $activeIndex + 10 * $activeIndex}px + 65px)`};
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #0891b2;
    box-shadow: 0 0 0 4px white, 0 0 0 6px #0891b2;
    transition: top 0.3s ease-in-out;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const DetailPanel = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  position: relative;
  background: linear-gradient(
      180deg,
      rgba(103, 63, 136, 0) 0%,
      rgba(103, 63, 136, 0.16) 100%
    ),
    url(${BoxCurveSpan});
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: auto 130px;
  border-radius: 16px;
  padding: 34px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const DetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 2;
`;

const DetailIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  //background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  //box-shadow: 0 10px 25px rgba(8, 145, 178, 0.3);
  position: relative;

  // &::after {
  //   content: "";
  //   position: absolute;
  //   inset: -4px;
  //   border-radius: 50%;
  //   background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
  //   opacity: 0.3;
  //   filter: blur(8px);
  //   z-index: -1;
  // }
`;

const DetailTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: 600;
  color: #121212;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const DetailDescription = styled.p`
  font-size: 20px;
  color: #555555;
`;

const QuestionLabel = styled.p`
  font-size: 20px;
  color: #121212;
  font-weight: 600;
`;

const Connector = styled.div`
  position: absolute;
  top: 50px;
  left: 69%;
  right: -50%;
  height: 2px;
  background-color: #00778e;
  z-index: 0;
  @media (max-width: 1024px) {
    left: 66%;
  }

  @media (min-width: 1024px) and (max-width: 1280px) {
    left: 63%;
  }

  @media (min-width: 1280px) and (max-width: 1400px) {
    left: 62%;
  }

  @media (min-width: 1400px) and (max-width: 1600px) {
    left: 61%;
  }

  @media (min-width: 1600px) and (max-width: 1800px) {
    left: 60%;
  }

  @media (min-width: 1800px) and (max-width: 2000px) {
    left: 59%;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
`;

const StepperLabelsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
`;

const StepIconWrapper = styled.div`
  width: 105px;
  height: 105px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const StepCircle = styled.div`
  background: #eaf3fb;
  border: 2px solid #00778e;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 auto 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00778e;
  font-weight: bold;
`;

const StepLabel = styled.p`
  font-size: 14px;
  color: #555555;
  text-align: center;
`;

const StepIndex = styled.p`
  font-size: 16px;
  color: #00778e;
`;

const ApplyButton = styled.button`
  display: inline-flex;
  width: max-content;
  gap: 12px;
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
  color: white;
  border: none;
  padding: 12px 34px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(8, 145, 178, 0.4);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const ButtonIcon = styled.div`
  transition: transform 0.3s ease;

  ${ApplyButton}:hover & {
    transform: translateX(4px);
  }
`;

interface stepType {
  label: string;
  icon: string;
}

interface Option {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  detailTitle: string;
  detailDescription: string;
  question?: string;
  steps?: Array<stepType>;
}

const ApplyForSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [activeOption, setActiveOption] = useState<string>("misa");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGccModalOpen, setGccModalOpen] = useState(false);
  const [isTermsOpen, setTermsOpen] = useState(false);
  const navigate = useNavigate();

  const options: Option[] = [
    {
      id: "misa",
      title: t("apply_for.misa.title"),
      description: t("apply_for.misa.description"),
      icon: <img src={MisaInvIconUnSelected} alt={t("apply_for.misa.alt")} />,
      iconActive: (
        <img src={MisaInvIconSelected} alt={t("apply_for.misa.alt")} />
      ),
      detailTitle: t("apply_for.misa.detail_title"),
      detailDescription: t("apply_for.misa.detail_description"),
    },
    {
      id: "RHQ",
      title: t("apply_for.rhq.title"),
      description: t("apply_for.rhq.description"),
      icon: <img src={RhqIconUnSelected} alt={t("apply_for.rhq.alt")} />,
      iconActive: <img src={RhqIconSelected} alt={t("apply_for.rhq.alt")} />,
      detailTitle: t("apply_for.rhq.detail_title"),
      detailDescription: t("apply_for.rhq.detail_description"),
    },
    {
      id: "strategic",
      title: t("apply_for.strategic.title"),
      description: t("apply_for.strategic.description"),
      icon: (
        <img src={StrategyIconUnSelected} alt={t("apply_for.strategic.alt")} />
      ),
      iconActive: (
        <img src={StrategyIconSelected} alt={t("apply_for.strategic.alt")} />
      ),
      detailTitle: t("apply_for.strategic.detail_title"),
      detailDescription: t("apply_for.strategic.detail_description"),
      question: t("apply_for.strategic.question"),
      steps: [
        {
          label: "Register",
          icon: RegisterIcon,
        },
        {
          label: "Complete our Application Form",
          icon: FormIcon,
        },
        {
          label: "Waiting for the Approval",
          icon: ApprovalIcon,
        },
        {
          label: "Benefit from the value-added services and advantages",
          icon: ServicesIcon,
        },
      ],
    },
    {
      id: "bidding",
      title: t("apply_for.bidding.title"),
      description: t("apply_for.bidding.description"),
      icon: (
        <img src={BindingIconUnSelected} alt={t("apply_for.bidding.alt")} />
      ),
      iconActive: (
        <img src={BindingIconSelected} alt={t("apply_for.bidding.alt")} />
      ),
      detailTitle: t("apply_for.bidding.detail_title"),
      detailDescription: t("apply_for.bidding.detail_description"),
      question: t("apply_for.bidding.question"),
      steps: [
        {
          label: "Register",
          icon: RegisterIcon,
        },
        {
          label: "Complete our Application Form",
          icon: FormIcon,
        },
        {
          label: "Waiting for the Approval",
          icon: ApprovalIcon,
        },
      ],
    },
  ];

  const activeOptionData =
    options.find((option) => option.id === activeOption) || options[0];

  const activeIndex = options.findIndex((option) => option.id === activeOption);

  return (
    <SectionContainer $isRTL={isRTL}>
      <InvestmentBanner />
      <SectionHeader $isRTL={isRTL}>
        <SectionTitle $isRTL={isRTL}>{t("apply_for.title")}</SectionTitle>
        <SectionSubtitle $isRTL={isRTL}>
          {t("apply_for.subtitle")}
        </SectionSubtitle>
      </SectionHeader>

      <ContentLayout>
        <CardContainer>
          <OptionsContainer>
            {options.map((option, index) => (
              <OptionCard
                key={option.id}
                isActive={activeOption === option.id}
                onClick={() => setActiveOption(option.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <OptionIconWrapper isActive={activeOption === option.id}>
                  {activeOption === option.id ? option.iconActive : option.icon}
                </OptionIconWrapper>
                <OptionContent>
                  <OptionTitle>{option.title}</OptionTitle>
                  <OptionDescription>{option.description}</OptionDescription>
                </OptionContent>
              </OptionCard>
            ))}
          </OptionsContainer>

          <TimelineConnector $activeIndex={activeIndex} />
        </CardContainer>

        <DetailPanel>
          <DetailIconWrapper>{activeOptionData.icon}</DetailIconWrapper>
          <DetailHeader>
            <DetailTitle>{activeOptionData.detailTitle}</DetailTitle>
            <DetailDescription>
              {activeOptionData.detailDescription}
            </DetailDescription>

            {activeOptionData.question && (
              <QuestionLabel>{activeOptionData.question}</QuestionLabel>
            )}

            <div>
              {activeOptionData.steps && (
                <StepsContainer>
                  {activeOptionData.steps.map((step, index) => (
                    <StepWrapper key={index}>
                      <StepIconWrapper>
                        <StepCircle>
                          <img src={step.icon} />
                        </StepCircle>
                      </StepIconWrapper>
                      {activeOptionData.steps &&
                        index < activeOptionData?.steps?.length - 1 && (
                          <Connector />
                        )}
                      <StepIndex>{`0${index + 1}`}</StepIndex>
                    </StepWrapper>
                  ))}
                </StepsContainer>
              )}
              <StepperLabelsWrapper>
                {activeOptionData.steps &&
                  activeOptionData.steps.map((step, index) => (
                    <StepWrapper key={index}>
                      <StepLabel>{step.label}</StepLabel>
                    </StepWrapper>
                  ))}
              </StepperLabelsWrapper>
            </div>

            <ApplyButton
              onClick={() => {
                if (activeOption === "bidding") {
                  navigate("/bidcertificateReg");
                } else if (activeOption === "strategic") {
                  navigate("/strategicinvestorReg");
                } else {
                  setIsModalOpen(true);
                }
              }}
            >
              {t("apply_for.apply_button")}
              <ButtonIcon>
                <ArrowRight size={20} />
              </ButtonIcon>
            </ApplyButton>
          </DetailHeader>
        </DetailPanel>
      </ContentLayout>

      {/* Terms Modal for both RHQ and MISA */}
      {isModalOpen && (
        <TermsModal2
          onClose={() => {
            setIsModalOpen(false);
            setGccModalOpen(true);
          }}
        />
      )}

      {/* GCC National Modal for both RHQ and MISA */}
      <GccNationalModal
        isOpen={isGccModalOpen}
        onClose={() => setGccModalOpen(false)}
        onSelect={(value: "yes" | "no") => {
          if (activeOption === "RHQ") {
            navigate("/RHQinvestmentReg");
          } else if (activeOption === "strategic") {
            navigate("/strategicinvestorReg");
          } else if (activeOption === "bidding") {
            navigate("/bidcertificateReg");
          } else {
            navigate("/investmentReg");
          }
        }}
      />
    </SectionContainer>
  );
};

export default ApplyForSection;
