import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FooterContainer,
  FooterSection,
  StyledLink,
  TroubleText,
} from "./styles/Footer.styles";
import { useTranslation } from "react-i18next";

interface FooterProps {
  linkName: string;
  linkPath: string;
  showFacingIssue?: boolean; // optional flag to switch the message
}

const Footer: React.FC<FooterProps> = ({
  linkName,
  linkPath,
  showFacingIssue = false,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <FooterContainer>
      <FooterSection>
        <StyledLink onClick={() => navigate(linkPath)}>{linkName}</StyledLink>
      </FooterSection>
      <FooterSection>
        <TroubleText>
          {showFacingIssue
            ? t("footer.facing_issue")
            : t("footer.trouble_login")}
        </TroubleText>
        <StyledLink onClick={() => navigate("/contact-us")}>
          {t("footer.contact_us")}
        </StyledLink>
      </FooterSection>
    </FooterContainer>
  );
};

export default Footer;
