import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import fileUpload from "../../../assets/images/investment/file-upload.svg";
import deleteIcon from "../../../assets/images/investment/delete_icon.svg";
import SectionTitle from "../../../components/common/SectionTitle";

const Section = styled.div<{ $isArabic?: boolean }>`
  margin-top: 2.5rem;
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

const DropZoneCard = styled.div<{ $isArabic?: boolean }>`
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
  width: 100%;
  direction: ${(props) => (props.$isArabic ? "rtl" : "ltr")};

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
  width: 32px;
  height: 32px;
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
  max-width: 80%;
`;

const FileName = styled.div<{ $isArabic?: boolean }>`
  font-size: 16px;
  color: #00778e;
  font-weight: 500;
  margin-left: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 200px;
  direction: ${(props) => (props.$isArabic ? "rtl" : "ltr")};
  unicode-bidi: plaintext;
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

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
  label: string;
  required?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  setFile,
  label,
  required = true,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const getCleanFileName = (file: File | null): string => {
    if (!file) return "";
    let fileName = file.name;
    fileName = fileName.split(/[?#]/)[0];
    try {
      fileName = decodeURIComponent(fileName);
    } catch {}

    return fileName;
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFile(file);
    } else {
      alert(t("attachment.validation.fileSizeExceeded"));
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
  };

  const dropzone = useDropzone({
    onDrop: handleDrop,
    multiple: false,
    accept: ALLOWED_TYPES,
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    noKeyboard: true,
  });

  return (
    <Section $isArabic={isArabic}>
      <Row>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <AttachmentLabel $isArabic={isArabic}>
            {required && <span>*</span>}
            {label}
          </AttachmentLabel>
          <DropZoneCard
            {...dropzone.getRootProps()}
            className={file ? "has-file" : ""}
            $isArabic={isArabic}
          >
            <input {...dropzone.getInputProps()} />
            {file ? (
              <>
                <FileInfo>
                  <UploadIcon src={fileUpload} alt="upload" />
                  <FileName $isArabic={isArabic} title={file.name}>
                    📎 {getCleanFileName(file)}
                  </FileName>
                </FileInfo>
                <DeleteButton onClick={handleDelete}>
                  <img src={deleteIcon} alt="delete" width={20} height={20} />
                </DeleteButton>
              </>
            ) : (
              <>
                <UploadIcon src={fileUpload} alt="upload" />
                <PrimaryText>
                  {t("attachment.dropzone.primaryText")}
                </PrimaryText>
                <SecondaryText>
                  {t("attachment.dropzone.secondaryText", {
                    formats: "PDF, DOC, JPG, PNG",
                  })}
                </SecondaryText>
                <BrowseText
                  onClick={(e) => {
                    e.stopPropagation();
                    dropzone.open();
                  }}
                >
                  {t("attachment.dropzone.browseButton")}
                </BrowseText>
              </>
            )}
          </DropZoneCard>
        </div>
      </Row>
    </Section>
  );
};

export default FileUpload;
