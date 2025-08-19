import React, { useState } from "react";
import styled from "styled-components";
import AddShareholderModal from "./AddShareholderModal";
import ContactPersonForm from "./ContactPersonForm";
import SectionTitle from "../../components/common/SectionTitle";
import { useTranslation } from 'react-i18next';

const PageWrapper = styled.div`
  background: #fafafa;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #cac4d0;
  width: 90%;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #161616;
`;

const Note = styled.div`
  background: #e0f7fa;
  color: #007c92;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  margin-right: 16px;
`;

const AddButton = styled.button`
  background-color: #007c92;
  color: white;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 2px;
  width: 100%;
  margin: 16px 0;
  background: linear-gradient(
    to right,
    #9333ea 0%,
    #9333ea 120px,
    #d1d5db 120px,
    #d1d5db 100%
  );
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: 12px;
`;

const EmptyText = styled.div`
  font-size: 14px;
  margin-bottom: 16px;
  color: #666;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 24px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  background: #f1f5f9;
  color: #333;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  color: black;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ color: string }>`
  border: none;
  background: ${({ color }) => color};
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-size: 16px;
  cursor: pointer;
`;

interface Shareholder {
  id: number;
  name: string;
  type: string;
  percentage: string;
  nationality: string;
  legalStatus: string;
}

type ContactStepProps = {
  contactFormRef: React.Ref<{ submit: () => void }>;
  onSuccess: () => void;
};

const ContactPersonStep: React.FC<ContactStepProps> = ({
  contactFormRef,
  onSuccess,
  
}) => {
const { t } = useTranslation();

  return (
    <PageWrapper>
      <Card>
        <SectionTitle>{t('contactForm.contactPerson')}</SectionTitle>

        <ContactPersonForm ref={contactFormRef} onSuccess={onSuccess} />
      </Card>
    </PageWrapper>
  );
};

export default ContactPersonStep;
