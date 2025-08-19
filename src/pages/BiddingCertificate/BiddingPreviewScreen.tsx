import React, { useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import fileIcon from "../../assets/images/file-uploaded.svg";

const PageWrapper = styled.div<{ $isRTL?: boolean }>`
  background: #f5f5f5;
  min-height: 60vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const Card = styled.div<{ $isRTL?: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 0px 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  font-family: ${(props) =>
    props.$isRTL && "'IBM Plex Sans Arabic', sans-serif"};
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const LinkSpan = styled.span`
  color: #00778e;
  cursor: pointer;
  text-decoration: underline;
`;

const Field = styled.div`
  border-right: 1px solid #e5e7eb;
  border-bottom: 1px solid #e5e7eb;
  padding: 12px;
`;

const Label = styled.div`
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
`;

const Value = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 1rem;
  margin-top: 20px;
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  margin-top: 0.2rem;
`;

const AttachmentWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FileCard = styled.div`
  display: flex;
  align-items: center;
  background: #f9fafb;
  padding: 12px 16px;
  border-radius: 2px;
  border: 1px solid #e5e7eb;
  font-size: 8px;
  font-weight: 500;
  color: #464c50;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #f3f4f6;
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
`;

type BiddingPreviewScreenProps = {
  previewRef: React.Ref<{ submit: () => void }>;
  onSuccess: () => void;
  onEditClick: () => void;
};

const BiddingPreviewScreen: React.FC<BiddingPreviewScreenProps> = ({
  previewRef,
  onSuccess,
  onEditClick,
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const handleEdit = () => {
    onEditClick();
  };

  const handleSubmit = () => {
    onSuccess();
  };

  useImperativeHandle(previewRef, () => ({
    submit: () => handleSubmit(),
  }));

  const files = [
    "Commercial Register Authenticated By Saudi Embassy.pdf",
    "Commercial Register Authenticated By Saudi Embassy.pdf",
    "Letters Of Award For 3 Projects As Main Contractor.pdf",
    "ISO 9001 Certificate (Valid).pdf",
    "ISO 14001 Certificate Or Alternative Certificates (Valid).pdf",
    "Occupational Safety Certificate OSHAS 18001 (Valid).pdf",
    "Confirmation Confirming The Reliability Of The Information Provided.pdf",
  ];

  return (
    <PageWrapper $isRTL={isRTL}>
      <Card $isRTL={isRTL}>
        <Section>
          <SectionTitle showActions onEdit={handleEdit} showEditText>
            {t("entityInformation.entityInfo")}
          </SectionTitle>
          <Grid>
            <Field>
              <Label>{t("entityInformation.company_name_arabic")}</Label>
              <Value>سهيل</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.company_name_english")}</Label>
              <Value>Saheel</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.project_name_arabic")}</Label>
              <Value>استثمار</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.project_name_english")}</Label>
              <Value>Investment pvt ltd.</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.capitalSr.label")}</Label>
              <Value>﷼ 50,000.00</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.government_entity")}</Label>
              <Value>Ministry of Investment</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.country")}</Label>
              <Value>Saudi Arabia</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.city")}</Label>
              <Value>Riyadh</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.postal_code")}</Label>
              <Value>8521</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.po_box")}</Label>
              <Value>AB2562</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.mobile_number.label")}</Label>
              <Value>+966 5214563241</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.telephone_number.label")}</Label>
              <Value>+966 4125475214</Value>
            </Field>
            <Field>
              <Label>{t("entityInformation.email")}</Label>
              <Value>info@saheelinvestment.com</Value>
            </Field>
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            {t("biddingCertificate.uploadedDocuments")}
          </SectionTitle>
          <AttachmentWrapper>
            {files.map((file, index) => (
              <FileCard key={index}>
                <img src={fileIcon} alt="File" />
                {file}
              </FileCard>
            ))}
          </AttachmentWrapper>
        </Section>
      </Card>
      <CheckboxContainer>
        <Checkbox type="checkbox" defaultChecked />
        <Label style={{ color: "#111827", fontWeight: "600" }}>
          I acknowledge reading and agreeing to the{" "}
          <LinkSpan onClick={() => console.log("Terms & Conditions clicked")}>
            terms &amp; conditions
          </LinkSpan>{" "}
          and{" "}
          <LinkSpan onClick={() => console.log("Privacy Policy clicked")}>
            Privacy Policy
          </LinkSpan>
          , the validity and accuracy of the data entered, and the Ministry's
          right to process it in a way that serves the public interest and
          facilitates the provision of investment services.
        </Label>
      </CheckboxContainer>
    </PageWrapper>
  );
};

export default BiddingPreviewScreen;
