import React, { useEffect, useState } from "react";
import styled from "styled-components";
import headerLogo from "../../../assets/images/header-logo.svg";
import headerLogoWhite from "../../../assets/images/header-logo-white.svg";

import dropdownIcon from "../../../assets/images/dropdown.svg";
import { ReactComponent as DropdownIcon } from "../../../assets/images/dropdown.svg";

import personIcon from "../../../assets/images/person.svg";
import personIconWhite from "../../../assets/images/person-white.svg";

import menuIcon from "../../../assets/images/menu-icon.svg";
import menuIconWhite from "../../../assets/images/menu_icon_white.svg";
import { useTranslation } from "react-i18next";

import {
  LanguageButton,
  LanguageSwitch,
} from "../../../pages/Login/LoginComponent.styles";
import { useDispatch } from "react-redux";
import { setAppLanguage } from "../../../store/slices/languageSlice";

const NavbarWrapper = styled.nav<{ backgroundColor?: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 2rem;
  flex-wrap: wrap;

  background: ${({ backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : "linear-gradient(180deg, #0b494b 0%, #0b494bcc 50%, #0b494b00 100%)"};

  background-color: ${({ backgroundColor }) =>
    backgroundColor || "rgba(0, 0, 0, 0.4)"};
`;

const StyledDropdownIcon = styled(DropdownIcon)<{ dark?: boolean }>`
  width: 16px;
  height: 16px;
  fill: ${({ dark }) => (dark ? "#fff" : "#000")};
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.div``;

const LogoImage = styled.img`
  width: 260px;
  height: 52px;
  object-fit: contain;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavItem = styled.div<{ dark?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  span {
    font-size: 14px;
    font-weight: 400;
    color: ${({ dark }) => (dark ? "#ffffff" : "#000000")};
  }

  // img {
  //   filter: ${({ dark }) => (dark ? "none" : "invert(1)")};
  // }
`;

const ProfileName = styled.span<{ dark?: boolean }>`
  position: relative;
  padding-left: 1rem;
  margin-left: 1rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: ${({ dark }) => (dark ? "#fff" : "#000")};
    opacity: 0.6;
  }
`;

const PersonImage = styled.img<{ dark?: boolean }>`
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: ${({ dark }) => (dark ? "none" : "invert(1)")};
`;

const LanguageSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${LanguageSwitch} {
    margin-bottom: 0;
  }
`;

const NavLink = styled.span<{ isDark: boolean }>`
  color: ${({ isDark }) => (isDark ? "#fff" : "#000")};
  font-size: 14px;
  font-weight: 400;
`;

type Props = {
  language: "en" | "ar";
  setLanguage: (lang: "en" | "ar") => void;
  backgroundColor?: string;
  isDarkBackground?: boolean;
};

const Navbar: React.FC<Props> = ({
  language = "en", // Default to English
  setLanguage,
  backgroundColor,
  isDarkBackground,
}) => {
  const [activeTab, setActiveTab] = useState("home");
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const handleLanguageChange = (lang: "en" | "ar") => {
    setLanguage(lang);
    dispatch(setAppLanguage(lang)); // update redux store
    localStorage.setItem("appLang", lang); // persist to local storage
    i18n.changeLanguage(lang); // change translation
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; // set text direction
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("appLang") as "en" | "ar" | null;
    const lang = savedLang || "en"; // fallback to English if nothing saved

    setLanguage(lang);
    dispatch(setAppLanguage(lang));
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, []);

  return (
    <NavbarWrapper backgroundColor={backgroundColor}>
      <NavLeft>
        <Logo>
          <LogoImage
            src={isDarkBackground ? headerLogo : headerLogoWhite}
            alt={t("navbar.logo_alt")}
          />
        </Logo>
      </NavLeft>
      <NavRight>
        <NavLinks>
          <NavItem>
            <span style={{ color: isDarkBackground ? "#fff" : "#000" }}>
              {t("navbar.home")}
            </span>
            <img
              src={dropdownIcon}
              alt={t("navbar.dropdown_alt")}
              style={{ filter: isDarkBackground ? "none" : "invert(1)" }}
              width={14}
              height={14}
            />
          </NavItem>

          {/* Other nav items */}
          <NavItem>
            <span style={{ color: isDarkBackground ? "#fff" : "#000" }}>
              {t("navbar.opportunities")}
            </span>
            <img
              src={dropdownIcon}
              alt={t("navbar.dropdown_alt")}
              style={{ filter: isDarkBackground ? "none" : "invert(1)" }}
              width={14}
              height={14}
            />
          </NavItem>

          <NavItem>
            <span style={{ color: isDarkBackground ? "#fff" : "#000" }}>
              {t("navbar.services")}
            </span>
            <img
              src={dropdownIcon}
              alt={t("navbar.dropdown_alt")}
              style={{ filter: isDarkBackground ? "none" : "invert(1)" }}
              width={14}
              height={14}
            />
          </NavItem>

          <NavItem>
            <span style={{ color: isDarkBackground ? "#fff" : "#000" }}>
              {t("navbar.contacts")}
            </span>
            <img
              src={dropdownIcon}
              alt={t("navbar.dropdown_alt")}
              style={{ filter: isDarkBackground ? "none" : "invert(1)" }}
              width={14}
              height={14}
            />
          </NavItem>
        </NavLinks>

        <ProfileName dark={isDarkBackground}>
          <NavItem>
            <PersonImage
              src={isDarkBackground ? personIcon : personIconWhite}
              alt={t("navbar.profile_alt")}
              style={{ filter: isDarkBackground ? "none" : "invert(1)" }}
              width={14}
              height={14}
            />
            <span style={{ color: isDarkBackground ? "#fff" : "#000" }}>
              {t("navbar.profile_name")}
            </span>
            <img
              src={dropdownIcon}
              alt={t("navbar.dropdown_alt")}
              style={{ filter: isDarkBackground ? "none" : "invert(1)" }}
              width={14}
              height={14}
            />
          </NavItem>
        </ProfileName>

        <LanguageSwitchWrapper>
          <LanguageSwitch variant="light">
            <LanguageButton
              active={language === "en"}
              onClick={() => handleLanguageChange("en")}
              variant="light"
            >
              English {/* Hardcoded to always show "English" */}
            </LanguageButton>
            <LanguageButton
              active={language === "ar"}
              onClick={() => handleLanguageChange("ar")}
              variant="light"
            >
              العربية {/* Hardcoded to always show "العربية" */}
            </LanguageButton>
          </LanguageSwitch>
        </LanguageSwitchWrapper>

        <img
          src={isDarkBackground ? menuIcon : menuIconWhite}
          alt={t("navbar.menu_alt")}
          width={50}
          height={50}
        />
      </NavRight>
    </NavbarWrapper>
  );
};

export default Navbar;
