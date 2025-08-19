import React from "react";
import styled from "styled-components";

import deleteIcon from "../../assets/images/investment/delete_icon.svg";
import editIcon from "../../assets/images/investment/edit_icon.svg";
import { useTranslation } from "react-i18next";

interface SectionTitleProps {
  children: React.ReactNode;
  borderColor?: string;
  $isRTL?: boolean;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  showEditText?: boolean;
}

const TitleWrapper = styled.div`
  position: relative;
  margin-top: 26px;
  margin-bottom: 16px;
`;

const TitleRow = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};
`;

const Title = styled.h2<{ borderColor: string; $isRTL?: boolean }>`
  text-align: ${(props) => (props.$isRTL ? "right" : "left")};
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
  font-size: 20px;
  font-weight: 600;
  color: #161616;
  display: inline-block;
  border-bottom: 2px solid ${({ borderColor }) => borderColor};
  position: relative;
  z-index: 1;
  padding-bottom: 15px;
`;

const Divider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #d1d5db;
  z-index: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.dir === "rtl" ? "row-reverse" : "row")};

  img {
    width: 32px;
    height: 32px;
  }
`;

const EditText = styled.span`
  color: #00778e;
  font-weight: 700;
  font-size: 18px;
  margin-left: 4px;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  background-color: #00778e;
  color: #ffffff;
  padding: 8px 16px;
`;

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  borderColor = "#884699",
  $isRTL = false,
  showActions = false,
  onEdit,
  onDelete,
  onAdd,
  showEditText = false,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dir = isArabic ? "rtl" : "ltr";
  return (
    <TitleWrapper dir={dir}>
      <TitleRow dir={dir}>
        <Title borderColor={borderColor} dir={dir}>
          {children}
        </Title>
        {showActions && (
          <Actions dir={dir}>
            {onEdit && (
              <IconButton onClick={onEdit} dir={dir}>
                <img src={editIcon} alt="Edit" />
                {showEditText && (
                  <EditText dir={dir}>
                    {t("preview.registration.edit")}
                  </EditText>
                )}
              </IconButton>
            )}
            {onDelete && (
              <IconButton onClick={onDelete} dir={dir}>
                <img src={deleteIcon} alt="Delete" />
              </IconButton>
            )}
            {onAdd && (
              <AddButton onClick={onAdd}>
                {t("preview.registration.add")}
              </AddButton>
            )}
          </Actions>
        )}
      </TitleRow>
      <Divider />
    </TitleWrapper>
  );
};

export default SectionTitle;
