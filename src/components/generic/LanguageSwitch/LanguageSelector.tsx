import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

interface StyledButtonProps {
  $active: boolean;
}

const Wrapper = styled.div`
  position: absolute;
  top: clamp(10px, 2vw, 20px);
  right: clamp(10px, 1.5vw, 20px);
  display: flex;
  padding: 6px;
  background-color: #d8e7ec;
  border-radius: 6px;
  width: 172px;
  gap: 6px;
`;

const StyledButton = styled.button<StyledButtonProps & { lang?: string }>`
  background: ${({ $active }) => ($active ? "#00778e" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#00778e")};
  border: none;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-family: ${({ lang }) =>
    lang === "ar"
      ? "'IBM Plex Sans Arabic', sans-serif"
      : "'Inter', sans-serif"};

  &:hover {
    background-color: rgba(0, 119, 142, 0.1);
  }
`;

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const storedLang = localStorage.getItem("appLang") as "en" | "ar" | null;
  const initialLang = storedLang || (i18n.language as "en" | "ar") || "en";

  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ar">(
    initialLang
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("appLang", selectedLanguage);
    document.documentElement.dir = selectedLanguage === "ar" ? "rtl" : "ltr";
  }, [selectedLanguage, i18n]);

  const handleChange = (lang: "en" | "ar") => {
    if (lang !== selectedLanguage) {
      setSelectedLanguage(lang);
    }
  };

  return (
    <Wrapper>
      <StyledButton
        lang="en"
        $active={selectedLanguage === "en"}
        onClick={() => handleChange("en")}
      >
        English
      </StyledButton>
      <StyledButton
        lang="ar"
        $active={selectedLanguage === "ar"}
        onClick={() => handleChange("ar")}
      >
        العربية
      </StyledButton>
    </Wrapper>
  );
};

export default LanguageSelector;
