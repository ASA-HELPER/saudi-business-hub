import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import fileUpload from "../../../assets/images/investment/file-upload.svg";
import { useTranslation } from "react-i18next";

const AttachmentLabel = styled.div`
  font-size: 10px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
  font-weight: 400;
  margin-bottom: 10px;
  color: #121212;
  text-align: "left";

  span {
    color: red;
    margin: "0 4px 0 0";
  }
`;

const DropZoneCard = styled.div`
  border: 1.5px dashed #eceef1;
  border-radius: 5px;
  background-color: #f3f4f6;
  padding: 1rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  border-color: #e0e2e7;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const UploadIcon = styled.img`
  width: 32px;
  height: 16px;
  margin-bottom: 0.75rem;
`;

const PrimaryText = styled.div`
  font-size: 10px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
  font-weight: 600;
  color: #1f2a37;
  margin-bottom: 0.5rem;
`;

const SecondaryText = styled.div`
  font-size: 8px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
  color: #384250;
  margin-bottom: 0.75rem;
  text-align: center;

  strong {
    font-weight: 400;
  }
`;

const BrowseText = styled.div`
  font-size: 9px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
  font-weight: 600;
  color: #161616;
  cursor: pointer;
  padding: 4px;
  border-radius: 2px;
  &:hover {
    background-color: #16161620;
  }
`;

const FileName = styled.div`
  margin-top: 1rem;
  font-size: 14px;
  font-family: '"IBM Plex Sans Arabic", sans-serif';
  color: #00778e;
  font-weight: 500;
`;

interface FileAttachmentProps {
  file: File | null;
  setFile: (file: File | null) => void;
  labelKey: string;
}

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = {
  "application/pdf": [],
  "application/msword": [],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  "image/jpeg": [],
  "image/jpg": [],
  "image/png": [],
};

const FileAttachment: React.FC<FileAttachmentProps> = ({
  file,
  setFile,
  labelKey,
}) => {
  const { t } = useTranslation();

  const handleDrop = (acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (selected && selected.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFile(selected);
    } else {
      alert(t("attachment.validation.fileSizeExceeded"));
    }
  };

  const dropzone = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: ALLOWED_TYPES,
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div style={{ flex: 1, minWidth: "280px" }}>
      <AttachmentLabel>
        <span>*</span> {`${labelKey}`}
      </AttachmentLabel>
      <DropZoneCard {...dropzone.getRootProps()}>
        <input {...dropzone.getInputProps()} />
        <UploadIcon src={fileUpload} alt="upload" />
        <PrimaryText>{t("attachment.dropzone.primaryText")}</PrimaryText>
        <SecondaryText>
          {t("attachment.dropzone.secondaryText", {
            formats: t("attachment.dropzone.formats"),
          })}
        </SecondaryText>
        <BrowseText onClick={dropzone.open}>
          {t("attachment.dropzone.browseButton")}
        </BrowseText>
        {file && <FileName>📎 {file.name}</FileName>}
      </DropZoneCard>
    </div>
  );
};

export default FileAttachment;
