import React, { useState } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import fileUpload from "../../../assets/images/investment/file-upload.svg";
import deleteIcon from "../../../assets/images/investment/delete_icon.svg";
import SectionTitle from "../../../components/common/SectionTitle";

const Section = styled.div<{ $isArabic?: boolean }>`
  margin-top: 2.5rem;
  border: 2px dashed #ccc;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
  direction: ${(props) => (props.$isArabic ? "rtl" : "ltr")};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  border-radius: 0 0 8px 8px;
`;

const AttachmentLabel = styled.div<{ $isArabic?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 16px;
  color: #121212;
  text-align: ${(props) => (props.$isArabic ? "right" : "left")};

  span {
    color: red;
    margin: ${(props) => (props.$isArabic ? "0 0 0 4px" : "0 4px 0 0")};
  }
`;

const DropZoneCard = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  background-color: #f9fafb;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  cursor: pointer;
  transition: all 0.3s ease;

  &.has-file {
    min-height: auto;
    padding: 1rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
`;

const UploadIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-bottom: 1rem;

  .has-file & {
    margin-bottom: 0;
    margin-right: 1rem;
  }
`;

const PrimaryText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1f2a37;
  margin-bottom: 0.5rem;

  .has-file & {
    display: none;
  }
`;

const SecondaryText = styled.div`
  font-size: 12px;
  color: #384250;
  margin-bottom: 0.75rem;
  text-align: center;

  strong {
    font-weight: 400;
  }

  .has-file & {
    display: none;
  }
`;

const BrowseText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #161616;
  cursor: pointer;

  .has-file & {
    display: none;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FileName = styled.div`
  font-size: 17px;
  color: #00778e;
  font-weight: 500;
  margin-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
`;

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES = {
  "application/pdf": [],
  "application/msword": [],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  "image/jpeg": [],
  "image/jpg": [],
  "image/png": [],
};

interface AttachmentProps {
  boardResolutionFile: File | null;
  setBoardResolutionFile: (file: File | null) => void;
  letterOfSupportFile: File | null;
  setLetterOfSupportFile: (file: File | null) => void;
}

const Attachment: React.FC<AttachmentProps> = ({
  boardResolutionFile,
  setBoardResolutionFile,
  letterOfSupportFile,
  setLetterOfSupportFile,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const handleDrop =
    (setter: (file: File | null) => void) => (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
        setter(file);
      } else {
        alert(t("attachment.validation.fileSizeExceeded"));
      }
    };

  const handleDelete = (setter: (file: File | null) => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setter(null);
  };

  const getDisplayFileName = (name: string) => {
    const extension = name.includes(".") ? name.split(".").pop() : "";
    const baseName = name.replace(/\.[^/.]+$/, "");
    return baseName.length > 15
      ? `${baseName.slice(0, 15)}...${extension}`
      : name;
  };

  const dropzone1 = useDropzone({
    onDrop: handleDrop(setBoardResolutionFile),
    multiple: false,
    accept: ALLOWED_TYPES,
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    noClick: false, 
    noKeyboard: true,
  });

  const dropzone2 = useDropzone({
    onDrop: handleDrop(setLetterOfSupportFile),
    multiple: false,
    accept: ALLOWED_TYPES,
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    noClick: false, 
    noKeyboard: true,
  });

  return (
    <Section $isArabic={isArabic}>
      <SectionTitle>{t("attachment.title")}</SectionTitle>
      <Row>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <AttachmentLabel $isArabic={isArabic}>
            <span>{t("attachment.boardResolution.requiredIndicator")}</span>
            {t("attachment.boardResolution.label")}
          </AttachmentLabel>
          <DropZoneCard
            {...dropzone1.getRootProps()}
            className={boardResolutionFile ? "has-file" : ""}
          >
            <input {...dropzone1.getInputProps()} />
            {boardResolutionFile ? (
              <>
                <FileInfo>
                  <UploadIcon src={fileUpload} alt="upload" />
                    <FileName title={boardResolutionFile.name}>
                      📎 {getDisplayFileName(boardResolutionFile.name.split("?")[0])}
                    </FileName>
                </FileInfo>
                <DeleteButton onClick={handleDelete(setBoardResolutionFile)}>
                  <img src={deleteIcon} alt="delete" />
                </DeleteButton>
              </>
            ) : (
              <>
                <UploadIcon src={fileUpload} alt="upload" />
                <PrimaryText>{t("attachment.dropzone.primaryText")}</PrimaryText>
                <SecondaryText>
                  {t("attachment.dropzone.secondaryText", {
                    formats: t("attachment.dropzone.formats"),
                  })}
                </SecondaryText>
                <BrowseText>{t("attachment.dropzone.browseButton")}</BrowseText>
              </>
            )}
          </DropZoneCard>
        </div>

        <div style={{ flex: 1, minWidth: "280px" }}>
          <AttachmentLabel $isArabic={isArabic}>
            <span>{t("attachment.letterOfSupport.requiredIndicator")}</span>
            {t("attachment.letterOfSupport.label")}
          </AttachmentLabel>
          <DropZoneCard
            {...dropzone2.getRootProps()}
            className={letterOfSupportFile ? "has-file" : ""}
          >
            <input {...dropzone2.getInputProps()} />
            {letterOfSupportFile ? (
              <>
                <FileInfo>
                  <UploadIcon src={fileUpload} alt="upload" />
                    <FileName title={letterOfSupportFile.name}>
                      📎 {getDisplayFileName(letterOfSupportFile.name.split("?")[0])}
                    </FileName>
                </FileInfo>
                <DeleteButton onClick={handleDelete(setLetterOfSupportFile)}>
                  <img src={deleteIcon} alt="delete" />
                </DeleteButton>
              </>
            ) : (
              <>
                <UploadIcon src={fileUpload} alt="upload" />
                <PrimaryText>{t("attachment.dropzone.primaryText")}</PrimaryText>
                <SecondaryText>
                  {t("attachment.dropzone.secondaryText", {
                    formats: t("attachment.dropzone.formats"),
                  })}
                </SecondaryText>
                <BrowseText>{t("attachment.dropzone.browseButton")}</BrowseText>
              </>
            )}
          </DropZoneCard>
        </div>
      </Row>
    </Section>
  );
};

export default Attachment;
