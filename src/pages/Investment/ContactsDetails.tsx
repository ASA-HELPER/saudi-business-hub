import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import Modal from "../../components/generic/Modal/Modal";
import BaseConfirmationModal from "../../components/generic/Modal/BaseConfirmationModal";
import deleteIcon from "../../assets/images/investment/delete_icon.svg";
import { useTranslation } from "react-i18next";

export interface ContactPersonProps {
  contactId: number;
  fullName: string;
  fullNameEn: string;
  nationalId: string;
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  nationality: string;
  city: string;
  country: string;
  mobile_number: string;
  email: string;
}

const TableWrapper = styled.div<{ dir?: "rtl" | "ltr" }>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-family: sans-serif;
  direction: ${props => props.dir || "ltr"};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Cell = styled.div<{ dir?: "rtl" | "ltr" }>`
  padding: 26px;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  text-align: ${props => props.dir === "rtl" ? "right" : "left"};

  &:nth-child(4n) {
    border-right: none;
  }

  &:nth-child(n + 9) {
    border-bottom: none;
  }
`;

const Label = styled.div<{ dir?: "rtl" | "ltr" }>`
  font-size: 16px;
  font-weight: 400;
  color: #5b6b79;
  margin-bottom: 4px;
  direction: ${props => props.dir || "ltr"};
`;

const Value = styled.div<{ dir?: "rtl" | "ltr" }>`
  font-size: 14px;
  color: #1d1d1f;
  font-weight: 500;
  direction: ${props => props.dir || "ltr"};
`;

const SectionHeader = styled.div<{ dir?: "rtl" | "ltr" }>`
  position: relative;
  margin-top: 26px;
  margin-bottom: 16px;
  text-align: ${props => props.dir === "rtl" ? "right" : "left"};
`;

const Title = styled.div<{ dir?: "rtl" | "ltr" }>`
  display: inline-block;
  border-bottom: 2px solid #884699;
  font-size: 20px;
  font-weight: 600;
  color: #161616;
  padding-bottom: 15px;
  position: relative;
  z-index: 1;
  margin-${props => props.dir === "rtl" ? "right" : "left"}: -12px;
`;

const EditButton = styled.div<{ dir?: "rtl" | "ltr" }>`
  position: absolute;
  ${props => props.dir === "rtl" ? "left" : "right"}: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  gap: 4px;
  flex-direction: ${props => props.dir === "rtl" ? "row-reverse" : "row"};

  img {
    width: 24px;
    height: 24px;
  }

  span {
    color: #00778e;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
  }
`;

const BottomLine = styled.div<{ dir?: "rtl" | "ltr" }>`
  position: absolute;
  bottom: 0;
  ${props => props.dir === "rtl" ? "right" : "left"}: 0;
  width: 100%;
  height: 2px;
  background: #d1d5db;
  z-index: 0;
`;

interface Props {
  data?: ContactPersonProps;
  onEditClick?: () => void;
  onDeleteClick?: (id: number) => void;
}

export const ContactsDetails = forwardRef<{ submit: () => void }, Props>(
  ({ data, onEditClick, onDeleteClick }, ref) => {
    const { t, i18n } = useTranslation();
    const isArabic = i18n.language === "ar";
    const dir = isArabic ? "rtl" : "ltr";
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useImperativeHandle(ref, () => ({
      submit: () => onEditClick?.(), 
    }));

    useEffect(() => {
      const clearData = async () => {
        await localStorage.removeItem("contactId");
      };
      clearData();
    }, []);

    if (!data) return null;

    const mockData = [
      { label: t("preview.contactdetail.fields.name"), value: data.fullName },
      { label: t("preview.contactdetail.fields.fullNameEn"), value: data.fullNameEn },
      { label: t("preview.contactdetail.fields.identityNumber"), value: data.passportNumber },
      { label: t("preview.contactdetail.fields.issueDate"), value: data.issueDate },
      { label: t("preview.contactdetail.fields.expiryDate"), value: data.expiryDate },
      { label: t("preview.contactdetail.fields.nationality"), value: data.nationality },
      { label: t("preview.contactdetail.fields.city"), value: data.city },
      { label: t("preview.contactdetail.fields.country"), value: data.country },
      { label: t("preview.contactdetail.fields.mobileNumber"), value: data.mobile_number },
      { label: t("preview.contactdetail.fields.email"), value: data.email },
    ];

    const handleEdit = async () => {
      await localStorage.setItem("contactId", data.contactId.toString());
      await localStorage.setItem("isContactEdit", "true");
      onEditClick?.();
    };

    const handleDelete = () => {
      onDeleteClick?.(data.contactId);
      setShowDeleteModal(false);
    };

    return (
      <>
        <SectionTitle
          showActions={true}
          onEdit={handleEdit}
          // onDelete={() => setShowDeleteModal(true)}
        >
          {t("preview.contactdetail.title")}
        </SectionTitle>

        <TableWrapper dir={dir}>
          {mockData.map((item, index) => (
            <Cell key={index} dir={dir}>
              <Label dir={dir}>{item.label}</Label>
              <Value dir={dir}>{item.value}</Value>
            </Cell>
          ))}
        </TableWrapper>

        {/* <BaseConfirmationModal
          isOpen={showDeleteModal}
          icon={deleteIcon}
          iconAlt={t("preview.contactdetail.delete")}
          title={t("preview.contactdetail.deleteModal.title")}
          yesLabel={t("preview.contactdetail.deleteModal.yesLabel")}
          noLabel={t("preview.contactdetail.deleteModal.noLabel")}
          onYes={handleDelete}
          onNo={() => setShowDeleteModal(false)}
          onClose={() => setShowDeleteModal(false)}
          dir={dir}
        /> */}
      </>
    );
  }
);

export default ContactsDetails;