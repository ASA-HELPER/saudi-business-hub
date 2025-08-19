import React, { useState } from "react";
import styled from "styled-components";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

interface TermsAcknowledgmentProps {
  onAcknowledgmentChange?: (acknowledged: boolean) => void;
  className?: string;
}

// Styled Components
const Container = styled.div<{ dir?: "rtl" | "ltr" }>`
  width: 100%;
  max-width: 1200px;
  padding: 24px;
  background-color: white;
  margin-top: 20px;
  direction: ${props => props.dir || "ltr"};
`;

const CheckboxContainer = styled.div<{ dir?: "rtl" | "ltr" }>`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-direction: ${props => props.dir === "rtl" ? "row-reverse" : "row"};
  justify-content: ${props => props.dir === "rtl" ? "flex-end" : "flex-start"};
  direction: ltr;

  &:hover {
    background-color: #f9fafb;
    border-radius: 6px;
    padding: 8px;
    margin: -8px;
  }
`;

const CheckboxWrapper = styled.div<{ $checked: boolean }>`
  position: relative;
  width: 20px;
  height: 20px;
  min-width: 20px;
  border: 2px solid ${(props) => (props.$checked ? "#00778e" : "#d1d5db")};
  border-radius: 4px;
  background-color: ${(props) => (props.$checked ? "#00778e" : "white")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
  margin-top: 2px;

  /* add "movement" */
  transform: ${(props) =>
    props.$checked ? "translateX(4px) scale(1.05)" : "translateX(0) scale(1)"};

  &:hover {
    border-color: #00778e;
    box-shadow: 0 0 0 3px rgba(0, 119, 142, 0.1);
  }

  &:focus-within {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 119, 142, 0.2);
  }
`;

const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const CheckIcon = styled(Check)<{ $visible: boolean }>`
  width: 14px;
  height: 14px;
  color: white;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) => (props.$visible ? "scale(1)" : "scale(0.5)")};
  transition: all 0.2s ease;
`;

const TextContent = styled.div<{ dir?: "rtl" | "ltr" }>`
  flex: 1;
  line-height: 1.6;
  font-size: 16px;
  color: #374151;
  font-family: "29LT_Bukra-Regular", Helvetica, sans-serif;
  text-align: ${props => props.dir === "rtl" ? "right" : "left"};
  direction: ${props => props.dir || "ltr"};
  unicode-bidi: bidi-override;
`;

const LinkText = styled.a<{ dir?: "rtl" | "ltr" }>`
  color: #00778e;
  text-decoration: underline;
  font-weight: 500;
  font-family: "29LT_Bukra-Medium", Helvetica, sans-serif;
  transition: color 0.2s ease;

  margin-inline: 4px; /* modern way */
  
  &:hover {
    color: #00667a;
    text-decoration: none;
  }

  &:focus {
    outline: 2px solid #00778e;
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const TermsAcknowledgment: React.FC<TermsAcknowledgmentProps> = ({
  onAcknowledgmentChange,
  className,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);

    if (onAcknowledgmentChange) {
      onAcknowledgmentChange(checked);
    }
  };

  const handleContainerClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);

    if (onAcknowledgmentChange) {
      onAcknowledgmentChange(newChecked);
    }
  };

  return (
    <Container className={className} dir={dir}>
      <CheckboxContainer onClick={handleContainerClick} dir={dir}>
        <CheckboxWrapper $checked={isChecked}>
          <HiddenCheckbox
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            aria-label={t("preview.terms.checkboxLabel")}
          />
          <CheckIcon $visible={isChecked} />
        </CheckboxWrapper>

        <TextContent dir={dir}>
          {t("preview.terms.acknowledgment")}{" "}
          <LinkText
            href="#terms"
            dir={dir}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Terms & Conditions clicked");
            }}
          >
            {t("preview.terms.termsConditions")}
          </LinkText>{" "}
          {t("preview.terms.and")}{" "}
          <LinkText
            href="#privacy"
            dir={dir}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Privacy Policy clicked");
            }}
          >
            {t("preview.terms.privacyPolicy")}
          </LinkText>
          {t("preview.terms.validationText")}
        </TextContent>
      </CheckboxContainer>
    </Container>
  );
};