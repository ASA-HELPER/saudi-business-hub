import React from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import fileUpload from "../../../assets/images/investment/file-upload.svg";
import deleteIcon from "../../../assets/images/investment/delete_icon.svg";
import { deleteAttachmentRequest } from "../../../store/actions/attachmentDeleteActions";

const DropZoneCard = styled.div<{ $isArabic?: boolean; $hasFile: boolean }>`
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  background-color: #f9fafb;
  padding: ${({ $hasFile }) => ($hasFile ? "1rem" : "2rem")};
  text-align: ${({ $isArabic, $hasFile }) =>
    $hasFile ? "left" : $isArabic ? "right" : "center"};
  display: flex;
  flex-direction: ${({ $hasFile }) => ($hasFile ? "row" : "column")};
  align-items: center;
  justify-content: ${({ $hasFile }) => ($hasFile ? "space-between" : "center")};
  min-height: ${({ $hasFile }) => ($hasFile ? "auto" : "200px")};
  cursor: pointer;
  transition: all 0.3s ease;
`;

const UploadIcon = styled.img`
  width: 28px;
  height: 28px;
  margin-bottom: 1rem;
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
  user-select: none;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 1rem;
`;

const PrimaryText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #1f2a37;
  margin-bottom: 0.5rem;
`;

const SecondaryText = styled.div`
  font-size: 12px;
  color: #384250;
  margin-bottom: 0.75rem;
  text-align: center;
`;

const BrowseText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #161616;
  cursor: pointer;
`;

const Label = styled.label<{ $isArabic?: boolean }>`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  text-align: ${({ $isArabic }) => ($isArabic ? "right" : "left")};
`;

const RequiredMark = styled.span`
  color: red;
  margin: 0 4px 0 0;
`;

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_TYPES: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "image/jpeg": [".jpeg", ".jpg"],
  "image/png": [".png"],
};

export interface FileUploadProps {
  file: File | string | null;
  setFile: (file: File | null) => void;
  fileName?: string;
  label: string;
  required?: boolean;
  mediaId?: number;
  onDeleteSuccess?: () => void;
  onRefresh?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  file,
  setFile,
  label,
  fileName,
  required,
  mediaId,
  onDeleteSuccess,
}) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const dispatch = useDispatch();

  const getFileName = (fileOrUrl: File | string) => {
    if (fileOrUrl instanceof File) return fileOrUrl.name;
    try {
      const url = new URL(fileOrUrl);
      const last = url.pathname.split("/").pop() || "";
      return decodeURIComponent(last.split("?")[0]);
    } catch {
      const last = fileOrUrl.split("/").pop() || "";
      return decodeURIComponent(last.split("?")[0]);
    }
  };

  const displayName = (name: string) => {
    const [base, ...rest] = name.split(".");
    const ext = rest.length ? `.${rest.pop()}` : "";
    return base.length > 30 ? `${base.slice(0, 30)}…${ext}` : name;
  };

  const onDrop = (accepted: File[]) => {
    const f = accepted[0];
    if (!f) return;

    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(t("attachment.validation.fileSizeExceeded"));
      return;
    }

    const ext = f.name.split(".").pop()?.toLowerCase();
    const okExts = Object.values(ALLOWED_TYPES).flat();
    if (!ext || !okExts.includes(`.${ext}`)) {
      alert(t("attachment.validation.fileTypeNotAllowed"));
      return;
    }

    setFile(f);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaId) {
      dispatch(deleteAttachmentRequest(mediaId));
    }
    onDeleteSuccess?.();
    setFile(null);
  };

  const getDisplayName = () => {
    if (fileName) return fileName;  
    if (!file) return "";
    
    if (file instanceof File) {
      return file.name;
    }
    
    try {
      const url = new URL(file);
      const pathname = decodeURIComponent(url.pathname);
      return pathname.split('/').pop() || "Document";
    } catch {
      const decoded = decodeURIComponent(file);
      return decoded.split('/').pop() || "Document";
    }
  };

  const dropzone = useDropzone({
    onDrop,
    multiple: false,
    maxSize: MAX_FILE_SIZE_MB * 1024 * 1024,
    noClick: false,
    noKeyboard: true,
    accept: ALLOWED_TYPES,
  });

  const hasFile = !!file || !!fileName;

  return (
    <section>
      <Label $isArabic={isArabic}>
        {required && <RequiredMark>*</RequiredMark>}
        {label}
      </Label>

      <DropZoneCard
        {...dropzone.getRootProps()}
        $isArabic={isArabic}
        $hasFile={hasFile}
        className={hasFile ? "has-file" : ""}
        aria-label={label}
      >
        <input {...dropzone.getInputProps()} />

        {hasFile ? (
          <>
            <FileInfo>
              <UploadIcon src={fileUpload} alt="upload-icon" />
                <FileName title={getDisplayName()}>
                  📎 {getDisplayName()}
                </FileName>
            </FileInfo>

            <DeleteButton onClick={handleDelete} aria-label="Delete file">
              <img src={deleteIcon} alt="delete icon" />
            </DeleteButton>
          </>
        ) : (
          <>
            <UploadIcon src={fileUpload} alt="upload-icon" />
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
    </section>
  );
};

export default FileUpload;