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

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-family: sans-serif;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Cell = styled.div`
  padding: 26px;
  border-bottom: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;

  &:nth-child(4n) {
    border-right: none;
  }

  &:nth-child(n + 9) {
    border-bottom: none;
  }
`;

const Label = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #5b6b79;
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: 14px;
  color: #1d1d1f;
  font-weight: 500;
`;

const SectionHeader = styled.div`
  position: relative;
  margin-top: 26px;
  margin-bottom: 16px;
`;

const Title = styled.div`
  display: inline-block;
  border-bottom: 2px solid #884699;
  font-size: 20px;
  font-weight: 600;
  color: #161616;
  padding-bottom: 15px;
  position: relative;
  z-index: 1;
`;

const EditButton = styled.div`
  position: absolute;
  right: 16px; /* Changed from 0 to 16px to move left */
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 2;
  gap: 4px; /* Reduced gap between icon and text */

  img {
    width: 24px;
    height: 24px;
  }

  span {
    color: #00778e;
    font-weight: 700;
    font-size: 18px; /* Reduced from 18px */
    line-height: 26px;
  }
`;

const BottomLine = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useImperativeHandle(ref, () => ({
      submit: () => onEditClick?.(), // Also fixed: call the function
    }));

    useEffect(() => {
      const clearData = async () => {
        await localStorage.removeItem("contactId");
      };
      clearData();
    }, []);
    if (!data) return null;

    console.log("data", JSON.stringify(data));

    const mockData = [
      { label: "Name", value: data.fullName },
      { label: "Full Name in English", value: data.fullNameEn },
      { label: "Identity Number", value: data.passportNumber },
      { label: "Identity Issue Date", value: data.issueDate },
      { label: "Identity Expiry Date", value: data.expiryDate },
      { label: "Nationality", value: data.nationality },
      { label: "City", value: data.city },
      { label: "Country", value: data.country },
      { label: "Mobile Number", value: data.mobile_number },
      { label: "Email", value: data.email },
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
          onDelete={() => setShowDeleteModal(true)}
        >
          Contact Information
        </SectionTitle>

        <TableWrapper>
          {mockData.map((item, index) => (
            <Cell key={index}>
              <Label>{item.label}</Label>
              <Value>{item.value}</Value>
            </Cell>
          ))}
        </TableWrapper>

        <BaseConfirmationModal
          isOpen={showDeleteModal}
          icon={deleteIcon}
          iconAlt="Delete"
          title="Are you sure you want to delete this contact?"
          yesLabel="Delete"
          noLabel="Cancel"
          onYes={handleDelete}
          onNo={() => setShowDeleteModal(false)}
          onClose={() => setShowDeleteModal(false)}
        />
      </>
    );
  }
);

export default ContactsDetails;
