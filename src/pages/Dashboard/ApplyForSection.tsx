import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FileText, TrendingUp, Shield, ArrowRight } from "lucide-react";
import TermsModal from "./TermsModal2";
import InvestmentBanner from "./InvestmentBanner";
import TermsModal2 from "./TermsModal2";
import GccNationalModal from "../Investment/modal/GccNationalModal";
import { useNavigate } from "react-router-dom";
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
  direction: ${({ $isRTL }) => ($isRTL ? 'rtl' : 'ltr')};
`;

const SectionHeader = styled.div<{ $isRTL?: boolean }>`
  margin-bottom: 28px;
  position: relative;
  padding-${({ $isRTL }) => ($isRTL ? 'right' : 'left')}: 24px;
  margin-top: 20px;

  &::before {
    content: "";
    position: absolute;
    ${({ $isRTL }) => ($isRTL ? 'right' : 'left')}: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);
    border-radius: 2px;
  }
`;

const SectionTitle = styled.h1<{ $isRTL?: boolean }>`
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
  font-size: 28px;
  font-weight: 700;
  color: #121212;
  margin-bottom: 8px;
  text-align: ${({ $isRTL }) => ($isRTL ? 'right' : 'left')};

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const SectionSubtitle = styled.p<{ $isRTL?: boolean }>`
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
  font-size: 18px;
  color: #555555;
  font-weight: 600;
  text-align: ${({ $isRTL }) => ($isRTL ? 'right' : 'left')};
`;

const ContentLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const TimelineConnector = styled.div`
  position: absolute;
  right: -25px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 60px;
  background: linear-gradient(135deg, #0891b2 0%, #7c3aed 100%);

  &::before {
    content: "";
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #0891b2;
    box-shadow: 0 0 0 4px white, 0 0 0 6px #0891b2;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const DetailPanel = styled.div`
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  //min-height: 500px;

  &::before {
    content: "";
    position: absolute;
    bottom: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #7c3aed 0%, #0891b2 100%);
    border-radius: 50%;
    opacity: 0.1;
    filter: blur(40px);
  }
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
`;

const DetailIconWrapper = styled.div`
  width: 80px;
  height: 80px;
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
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const DetailDescription = styled.p`
  font-size: 16px;
  color: #4b5563;
  line-height: 1.7;
  margin-bottom: 32px;
  position: relative;
  z-index: 2;
`;

const ApplyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
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

interface Option {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  detailTitle: string;
  detailDescription: string;
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
      iconActive: <img src={MisaInvIconSelected} alt={t("apply_for.misa.alt")} />,
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
      icon: <img src={StrategyIconUnSelected} alt={t("apply_for.strategic.alt")} />,
      iconActive: <img src={StrategyIconSelected} alt={t("apply_for.strategic.alt")} />,
      detailTitle: t("apply_for.strategic.detail_title"),
      detailDescription: t("apply_for.strategic.detail_description"),
    },
    {
      id: "bidding",
      title: t("apply_for.bidding.title"),
      description: t("apply_for.bidding.description"),
      icon: <img src={BindingIconUnSelected} alt={t("apply_for.bidding.alt")} />,
      iconActive: <img src={BindingIconSelected} alt={t("apply_for.bidding.alt")} />,
      detailTitle: t("apply_for.bidding.detail_title"),
      detailDescription: t("apply_for.bidding.detail_description"),
    },
  ];

  const activeOptionData =
    options.find((option) => option.id === activeOption) || options[0];

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

          <TimelineConnector />
        </CardContainer>

        <DetailPanel>
          <DetailHeader>
            <DetailIconWrapper>{activeOptionData.icon}</DetailIconWrapper>
            <DetailTitle>{activeOptionData.detailTitle}</DetailTitle>
          </DetailHeader>

          <DetailDescription>{activeOptionData.detailDescription}</DetailDescription>

          <ApplyButton onClick={() => setIsModalOpen(true)}>
            {t("apply_for.apply_button")}
            <ButtonIcon>
              <ArrowRight size={20} />
            </ButtonIcon>
          </ApplyButton>
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
          } else {
            navigate("/investmentReg");
          }
        }}
      />
    </SectionContainer>
  );
};

export default ApplyForSection;