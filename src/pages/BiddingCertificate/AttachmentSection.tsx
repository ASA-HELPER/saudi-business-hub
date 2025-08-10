import React, { useState } from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import FileAttachment from "../../components/common/FileAttachment/FileAttachment";
import { useTranslation } from "react-i18next";

const AttachmentWrapper = styled.div`
  flex: 0 0 100%;

  @media (min-width: 768px) {
    flex: 0 0 calc(50% - 1rem);
  }
`;

const AttachmentSection: React.FC = () => {
  const [commercialRegister, setCommercialRegister] = useState<File | null>(
    null
  );
  const [financialStatements, setFinancialStatements] = useState<File | null>(
    null
  );
  const [lettersOfAward, setLettersOfAward] = useState<File | null>(null);
  const [iso9001, setIso9001] = useState<File | null>(null);
  const [iso14001, setIso14001] = useState<File | null>(null);
  const [oshCertificate, setOshCertificate] = useState<File | null>(null);
  const [reliabilityConfirmation, setReliabilityConfirmation] =
    useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t, i18n } = useTranslation();

  const attachmentFields = [
    {
      key: "Commercial Register Authenticated By Saudi Embassy.",
      file: commercialRegister,
      setFile: setCommercialRegister,
    },
    {
      key: "Financial Statements For Last 3 Years",
      file: financialStatements,
      setFile: setFinancialStatements,
    },
    {
      key: "Letters Of Award For 3 Projects As Main Contractor",
      file: lettersOfAward,
      setFile: setLettersOfAward,
    },
    {
      key: "ISO 9001 Certificate (Valid).",
      file: iso9001,
      setFile: setIso9001,
    },
    {
      key: "ISO 14001 Certificate Or Alternative Certificates (Valid).",
      file: iso14001,
      setFile: setIso14001,
    },
    {
      key: "Occupational Safety Certificate OSHAS 18001 (Valid).",
      file: oshCertificate,
      setFile: setOshCertificate,
    },
    {
      key: "Confirmation Confirming The Reliability Of The Information Provided",
      file: reliabilityConfirmation,
      setFile: setReliabilityConfirmation,
    },
  ];

  return (
    <Section>
      <SectionTitle>{t("attachment.title")}</SectionTitle>
      <Row style={{ marginTop: "10px" }}>
        {attachmentFields.map(({ key, file, setFile }) => (
          <AttachmentWrapper>
            <FileAttachment
              key={key}
              file={file}
              setFile={setFile}
              labelKey={key}
            />
          </AttachmentWrapper>
        ))}
      </Row>
    </Section>
  );
};

const Section = styled.div`
  margin-bottom: 32px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
`;

export default AttachmentSection;
