import React from "react";
import styled from "styled-components";
import SectionTitle from "../../components/common/SectionTitle";
import fileUpload from "../../assets/images/investment/file-upload.svg";

const AttachmentSection: React.FC = () => {
  const attachmentTitles = [
    "Board Resolution",
    "Shareholder Passport Copy",
    "Commercial Registration",
    "Bank Statement",
  ];

  return (
    <Section>
      <SectionTitle>Attachment</SectionTitle>
      <Row>
        {attachmentTitles.map((title, index) => (
          <AttachmentBlock key={index}>
            <AttachmentTitle>
              <span>*</span> {title}
            </AttachmentTitle>
            <AttachmentCard>
              <Icon>
                <img src={fileUpload} alt="fileUpload" />
              </Icon>
              <AttachmentContent>
                Drag and drop files here to upload
                <SubText>
                  Maximum file size allowed is 5MB, supported file formats
                  include .jpg, .png, and .pdf.
                </SubText>
                <BrowseLink>Browse Files</BrowseLink>
              </AttachmentContent>
            </AttachmentCard>
          </AttachmentBlock>
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

const AttachmentBlock = styled.div`
  flex: 1 1 calc(50% - 12px); // 2 per row with gap
  min-width: 280px;
`;

const AttachmentTitle = styled.h4`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 16px;
  color: #121212;

  span {
    color: red;
    margin-right: 4px;
  }
`;

const AttachmentCard = styled.div`
  flex: 1;
  min-width: 280px;
  border: 1px dashed #cfd4dc;
  border-radius: 8px;
  padding: 16px; /* Reduced from 24px */
  background-color: #f3f4f6;
`;

const Icon = styled.div`
  font-size: 40px; /* Reduced from 48px */
  margin-bottom: 8px; /* Reduced from 12px */
  text-align: center;
`;

const AttachmentContent = styled.div`
  text-align: center;
  color: #666;
  font-size: 14px; /* Reduced from 16px */
  font-weight: 500;
`;

const SubText = styled.div`
  font-size: 11px; /* Slightly smaller */
  margin-top: 6px; /* Reduced from 8px */
  font-weight: 400;
`;

const BrowseLink = styled.div`
  font-weight: 500;
  font-size: 13px; /* Slightly smaller */
  margin-top: 10px; /* Reduced from 15px */
  cursor: pointer;
  color: #161616;
`;


export default AttachmentSection;
