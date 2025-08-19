import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import heroBg from "../../assets/images/hero-bg.png";
import Navbar from "../../components/common/dashboard/Navbar";
import InvestmentBanner from "./InvestmentBanner";
import ApplyForSection from "./ApplyForSection";
import SectorOverviewSection from "./SectorOverviewSection";
import RealEstateOpportunities from "./RealEstateOpportunities";
import NewsSection from "./NewsSection";
import FooterSectionTop from "./FooterSection";
import Footer from "../../components/common/ContactUsSection/Footer";
import { useTranslation } from "react-i18next";

// 🔷 Styled Components
const HeroWrapper = styled.div`
  background-image: linear-gradient(rgba(0, 38, 58, 0.8), rgba(0, 38, 58, 0.8)),
    url(${heroBg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  color: white;
  max-height: 45vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeroContent = styled.div`
  padding: 2rem 8rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
  background: linear-gradient(
    180deg,
    #0b494b 0%,
    #0b494bcc 50%,
    #0b494b00 100%
  );

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
    padding: 3rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background: white;
  color: #003c56;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: white;
  border: 2px solid white;
  padding: 0.8rem 2rem;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const GraySpacer = styled.div`
  height: 150px;
  background-color: #fff;
  width: 100%;
`;

// 🔷 Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<"en" | "ar">("en");

  useEffect(() => {
    const savedLang = (localStorage.getItem("appLang") as "en" | "ar") || "en";
    setLanguage(savedLang);
    i18n.changeLanguage(savedLang);
    document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
  }, []);

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("appLang", lang); // ✅ persist
  };

  return (
    <>
      <HeroWrapper>
        <Navbar
          language={language}
          setLanguage={handleLanguageChange}
          isDarkBackground={true}
        />

        <HeroContent>
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Title>{t("hero.title")}</Title>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Subtitle>{t("hero.subtitle")}</Subtitle>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <ButtonGroup>
              <PrimaryButton>{t("hero.register_button")}</PrimaryButton>
              <SecondaryButton>{t("hero.explore_button")}</SecondaryButton>
            </ButtonGroup>
          </motion.div>
        </HeroContent>
      </HeroWrapper>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <ApplyForSection />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <SectorOverviewSection />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <RealEstateOpportunities />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        <NewsSection />
      </motion.div>

      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.0, duration: 0.6 }}
      >
        <FooterSectionTop />
        <GraySpacer />
      </motion.div>
      <Footer />
    </>
  );
};

export default HeroSection;
