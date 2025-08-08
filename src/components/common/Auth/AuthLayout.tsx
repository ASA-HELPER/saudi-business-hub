import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  LeftSection,
  RightSection,
  InvestmentInfo,
  Title,
  SubTitle,
  InfoBox,
  BottomLeftSVGWrapper,
} from "./AuthLayout.styles";
import LanguageSelector from "../../generic/LanguageSwitch/LanguageSelector";
import Footer from "../AuthForm/Footer/Footer";
import { useTranslation } from "react-i18next";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [language, setLanguage] = useState<"en" | "ar">("ar");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    html.setAttribute("dir", dir);
    html.setAttribute("lang", i18n.language);
  }, [i18n.language]);

  return (
    <Container>
      <LeftSection>
        {/* Animate Investment Info */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <InvestmentInfo>
            <InfoBox>
              <Title>{t("start_investment_journey")}</Title>
              <SubTitle>{t("registration_misa")}</SubTitle>
              <ul>
                <li>
                  Apply for investment registration <br />
                  <a href="#">(User's Guide - New Investment Registration)</a>
                </li>
                <li>
                  Obtain a temporary certificate to submit proposals for
                  government projects
                </li>
                <li>
                  Benefit from E services that provided by MISA and other
                  entities
                </li>
                <li>Contact us through investor care channels</li>
                <li>Expand your investments</li>
              </ul>
            </InfoBox>
          </InvestmentInfo>
        </motion.div>

        <BottomLeftSVGWrapper>
          <img src="/assets/images/bottom-image.png" alt="Decorative SVG" />
        </BottomLeftSVGWrapper>
      </LeftSection>

      <RightSection>
        <LanguageSelector />
        <Footer />
        {children}
      </RightSection>
    </Container>
  );
};

export default AuthLayout;
