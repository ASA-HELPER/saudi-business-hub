import React from "react";
import styled from "styled-components";
import uploadIcon from "../../assets/images/upload-icon.svg";

const Section = styled.div`
  margin-top: 2.5rem;
`;

const SectionTitle = styled.h3`
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px 8px 0 0;
  font-size: 1rem;
  background: linear-gradient(90deg, #cedfe3, #cedfe300);
  font-size: 22px;
  color: #121212;
`;

const UploadGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #f9fafb;
  border-radius: 0 0 8px 8px;
  padding: 2rem;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const UploadField = styled.div`
  display: flex;
  flex-direction: column;
`;

const UploadLabel = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 0.75rem;
  color: #1e293b;

  span {
    color: red;
    margin-left: 0.25rem;
  }
`;

const UploadBox = styled.div`
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  background-color: #f9fafb;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 79px;
    height: 46px;
    margin-bottom: 1rem;
  }

  strong {
    color: #00a859; /* green for "Click here" */
    font-weight: 600;
  }

  span {
    color: #000; /* black for the rest of the sentence */
    font-weight: 400;
  }

  p {
    font-size: 0.85rem;
    color: #6b7280;
    margin-top: 0.5rem;
  }
`;

const AttachmentSection: React.FC = () => {
  return (
    <Section>
      <SectionTitle>Attachment</SectionTitle>
      <UploadGrid>
        <UploadField>
          <UploadLabel>
            Board resolution<span>*</span>
          </UploadLabel>
          <UploadBox>
            <img src={uploadIcon} alt="upload" />
            <div>
              <div>
                <strong>Click here</strong>{" "}
                <span>to upload or drop files here</span>
              </div>
              <p>The maximum size of uploaded files must be less than 5 MB</p>
            </div>
          </UploadBox>
        </UploadField>

        <UploadField>
          <UploadLabel>
            Letter of support from supervising authority (Business Incubators or
            Saudi Universities)<span>*</span>
          </UploadLabel>
          <UploadBox>
            <img src={uploadIcon} alt="upload" />
            <div>
              <div>
                <strong>Click here</strong>{" "}
                <span>to upload or drop files here</span>
              </div>
              <p>The maximum size of uploaded files must be less than 5 MB</p>
            </div>
          </UploadBox>
        </UploadField>
      </UploadGrid>
    </Section>
  );
};

export default AttachmentSection;
