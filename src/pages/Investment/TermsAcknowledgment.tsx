import React, { useState } from "react";
import styled from "styled-components";
import { Check } from "lucide-react";

interface TermsAcknowledgmentProps {
  onAcknowledgmentChange?: (acknowledged: boolean) => void;
  className?: string;
}

// Styled Components
const Container = styled.div`
  width: 100%;
  max-width: 1200px;

  padding: 24px;
  background-color: white;
  //border: 1px solid #e5e7eb;
  //border-radius: 8px;
  //box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  margin-top: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

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
  transition: all 0.2s ease;
  cursor: pointer;
  margin-top: 2px;

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

const TextContent = styled.div`
  flex: 1;
  line-height: 1.6;
  font-size: 16px;
  color: #374151;
  font-family: "29LT_Bukra-Regular", Helvetica, sans-serif;
`;

const LinkText = styled.a`
  color: #00778e;
  text-decoration: underline;
  font-weight: 500;
  font-family: "29LT_Bukra-Medium", Helvetica, sans-serif;
  transition: color 0.2s ease;

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
    <Container className={className}>
      <CheckboxContainer onClick={handleContainerClick}>
        <CheckboxWrapper $checked={isChecked}>
          <HiddenCheckbox
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            onClick={(e) => e.stopPropagation()}
            aria-label="Acknowledge terms and conditions"
          />
          <CheckIcon $visible={isChecked} />
        </CheckboxWrapper>

        <TextContent>
          I acknowledge reading and agreeing to the{" "}
          <LinkText
            href="#terms"
            onClick={(e) => {
              e.stopPropagation();
              // Handle terms link click
              console.log("Terms & Conditions clicked");
            }}
          >
            terms & conditions
          </LinkText>{" "}
          and{" "}
          <LinkText
            href="#privacy"
            onClick={(e) => {
              e.stopPropagation();
              // Handle privacy policy link click
              console.log("Privacy Policy clicked");
            }}
          >
            Privacy Policy
          </LinkText>
          , the validity and accuracy of the data entered, and the Ministry's
          right to process it in a way that serves the public interest and
          facilitates the provision of investment services.
        </TextContent>
      </CheckboxContainer>
    </Container>
  );
};
