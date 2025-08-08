import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// Background wrapper with gradient
const SectionWrapper = styled.section<{ $isRTL?: boolean }>`
  background: linear-gradient(135deg, #00566b 0%, #502c8a 100%);
  color: white;
  padding: 4rem 2rem 8rem;
  position: relative;
  direction: ${({ $isRTL }) => ($isRTL ? 'rtl' : 'ltr')};
`;

// Container for content
const ContentContainer = styled.div<{ $isRTL?: boolean }>`
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  flex-direction: ${({ $isRTL }) => ($isRTL ? 'row-reverse' : 'row')};
`;

// Left side title + text + button
const LeftContent = styled.div`
  flex: 1;
  min-width: 300px;
`;

const Heading = styled.h2<{ $isRTL?: boolean }>`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
  text-align: ${({ $isRTL }) => ($isRTL ? 'right' : 'left')};
`;

const Subheading = styled.p<{ $isRTL?: boolean }>`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
  text-align: ${({ $isRTL }) => ($isRTL ? 'right' : 'left')};
`;

const ExploreButton = styled.button<{ $isRTL?: boolean }>`
  background: white;
  color: #003c56;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: ${({ $isRTL }) => ($isRTL ? 'row-reverse' : 'row')};
`;

// Right side glass card
const GlassCard = styled.div<{ $isRTL?: boolean }>`
  flex: 1;
  min-width: 320px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  text-align: ${({ $isRTL }) => ($isRTL ? 'right' : 'left')};
`;

const CardHeading = styled.h3<{ $isRTL?: boolean }>`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
`;

const CardText = styled.p<{ $isRTL?: boolean }>`
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
`;

const KnowMoreButton = styled.button<{ $isRTL?: boolean }>`
  background: white;
  color: #003c56;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: ${({ $isRTL }) => ($isRTL ? 'row-reverse' : 'row')};
`;

// Stats Section
const StatsBar = styled.div<{ $isRTL?: boolean }>`
  background: #0f1e23;
  padding: 3rem;
  border-radius: 16px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  color: white;
  position: absolute;
  bottom: -7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  direction: ${({ $isRTL }) => ($isRTL ? 'rtl' : 'ltr')};
`;

const StatItem = styled.div<{ $isRTL?: boolean }>`
  flex: 1;
  min-width: 150px;
  text-align: center;
  padding: 1rem;

  & + & {
    border-left: ${({ $isRTL }) => ($isRTL ? 'none' : '1px solid rgba(255, 255, 255, 0.2)')};
    border-right: ${({ $isRTL }) => ($isRTL ? '1px solid rgba(255, 255, 255, 0.2)' : 'none')};
  }

  @media (max-width: 768px) {
    border-left: none;
    border-right: none;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

const StatTitle = styled.div<{ $isRTL?: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  color: #00aec7;
  margin-bottom: 0.5rem;
  position: relative;

  &::before {
    content: "";
    height: 3px;
    width: 32px;
    background: #a655e1;
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StatDescription = styled.div<{ $isRTL?: boolean }>`
  font-size: 0.9rem;
  font-family: ${({ $isRTL }) => 
    $isRTL ? '"IBM Plex Sans Arabic", sans-serif' : 'inherit'};
`;

const SectorOverviewWrapper = styled.div`
  background-color: white;
  padding: 0 0 6rem;
  position: relative;
`;

const SectorOverviewSection = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <SectorOverviewWrapper>
      <SectionWrapper $isRTL={isRTL}>
        <ContentContainer $isRTL={isRTL}>
          <LeftContent>
            <Heading $isRTL={isRTL}>{t("sector_overview.title")}</Heading>
            <Subheading $isRTL={isRTL}>
              {t("sector_overview.subtitle")}
            </Subheading>
            <ExploreButton $isRTL={isRTL}>
              {t("sector_overview.explore_button")} <span>→</span>
            </ExploreButton>
          </LeftContent>

          <GlassCard $isRTL={isRTL}>
            <CardHeading $isRTL={isRTL}>{t("sector_overview.card_title")}</CardHeading>
            <CardText $isRTL={isRTL}>
              {t("sector_overview.card_text")}
            </CardText>
            <KnowMoreButton $isRTL={isRTL}>
              {t("sector_overview.know_more_button")} <span>→</span>
            </KnowMoreButton>
          </GlassCard>
        </ContentContainer>

        <StatsBar $isRTL={isRTL}>
          <StatItem $isRTL={isRTL}>
            <StatTitle $isRTL={isRTL}>{t("sector_overview.stats.0.value")}</StatTitle>
            <StatDescription $isRTL={isRTL}>{t("sector_overview.stats.0.label")}</StatDescription>
          </StatItem>
          <StatItem $isRTL={isRTL}>
            <StatTitle $isRTL={isRTL}>{t("sector_overview.stats.1.value")}</StatTitle>
            <StatDescription $isRTL={isRTL}>{t("sector_overview.stats.1.label")}</StatDescription>
          </StatItem>
          <StatItem $isRTL={isRTL}>
            <StatTitle $isRTL={isRTL}>{t("sector_overview.stats.2.value")}</StatTitle>
            <StatDescription $isRTL={isRTL}>{t("sector_overview.stats.2.label")}</StatDescription>
          </StatItem>
          <StatItem $isRTL={isRTL}>
            <StatTitle $isRTL={isRTL}>{t("sector_overview.stats.3.value")}</StatTitle>
            <StatDescription $isRTL={isRTL}>{t("sector_overview.stats.3.label")}</StatDescription>
          </StatItem>
          <StatItem $isRTL={isRTL}>
            <StatTitle $isRTL={isRTL}>{t("sector_overview.stats.4.value")}</StatTitle>
            <StatDescription $isRTL={isRTL}>{t("sector_overview.stats.4.label")}</StatDescription>
          </StatItem>
        </StatsBar>
      </SectionWrapper>
    </SectorOverviewWrapper>
  );
};

export default SectorOverviewSection;