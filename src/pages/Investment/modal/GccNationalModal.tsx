import React from "react";
import styled from "styled-components";
import CloseIcon from "../../../assets/images/close-circle.svg";
import TickIcon from "../../../assets/images/person_gcc.svg";
import { useTranslation } from "react-i18next";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div<{ $isRTL?: boolean }>`
  position: relative;
  background: white;
  padding: 40px 32px 32px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
  width: 630px;
  height: 400px;
  text-align: center;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const CloseButton = styled.button<{ $isRTL?: boolean }>`
  position: absolute;
  top: 16px;
  ${(props) => (props.$isRTL ? "left: 16px" : "right: 16px")};
  border: none;
  background: transparent;
  cursor: pointer;
`;

const IconWrapper = styled.div`
  background-color: #ede6f7;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 48px;
    height: 48px;
  }
`;

const Title = styled.h2<{ $isRTL?: boolean }>`
  font-family: ${(props) =>
    props.$isRTL ? "'IBM Plex Sans Arabic', sans-serif" : "inherit"};
  font-size: 30px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 32px;
  line-height: 1.4;
  white-space: pre-line;
`;

const ButtonRow = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 40px;
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};
`;

const OutlinedButton = styled.button`
  padding: 14px 48px;
  border: 2px solid #00778e;
  background: white;
  color: #00778e;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  min-width: 160px;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f9fb;
  }
`;

const FilledButton = styled.button`
  padding: 16px 48px;
  border: none;
  background: #00778e;
  color: white;
  font-weight: 600;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  min-width: 160px;
  transition: all 0.2s ease;

  &:hover {
    background: #006177;
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (value: "yes" | "no") => void;
}

const GccNationalModal: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer $isRTL={isRTL}>
        <CloseButton $isRTL={isRTL} onClick={onClose}>
          <img src={CloseIcon} alt={t("common.close")} width={32} height={32} />
        </CloseButton>

        <IconWrapper>
          <img src={TickIcon} alt={t("gccModal.iconAlt")} />
        </IconWrapper>

        <Title $isRTL={isRTL}>
          {t("gccModal.title")}
        </Title>

        <ButtonRow $isRTL={isRTL}>
          <OutlinedButton onClick={() => onSelect("yes")}>
            {t("common.yes")}
          </OutlinedButton>
          <FilledButton onClick={() => onSelect("no")}>
            {t("common.no")}
          </FilledButton>
        </ButtonRow>
      </ModalContainer>
    </Overlay>
  );
};

export default GccNationalModal;