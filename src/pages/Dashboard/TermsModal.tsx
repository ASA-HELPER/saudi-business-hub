import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  overflow: hidden; // Prevent scroll propagation
`;

const ModalContainer = styled.div`
  background: #fff;
  width: 90%;
  //max-width: 900px;
  height: 90vh; // Fixed height
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-item: center;
`;

// Gradient Header Section
const ModalHeader = styled.div`
  //background: linear-gradient(90deg, #d6e6ea, #d6e6ea00);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 1rem;
  flex-wrap: wrap;
  //margin: 20px;
  border-radius: 12px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 35px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin: 0;
  color: #121212;
`;

const TopActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  button {
    padding: 0.6rem 1.2rem;
    //border: 2px solid #007d8a;
    border-radius: 6px;
    font-weight: 600;
    //color: #007d8a;
    cursor: pointer;
    white-space: nowrap;
  }

  @media (min-width: 600px) {
    margin-top: 0;
  }
`;

// Footer with Actions
const BottomActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem 1rem;
  //border-top: 1px solid #ddd;

  button {
    padding: 0.7rem 1.4rem;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    font-size: 1rem;
  }
`;

const CloseButton = styled.button`
  border: 2px solid #007d8a;
  background: white;
  color: #007d8a;
  &:hover {
    background: #eef9fa;
  }
  width: 10rem;
`;

const AgreeButton = styled.button`
  background: #00778e;
  border: none;
  color: white;
  width: 10rem;
  &:hover {
    background: #006676;
  }
`;

const DownloadButton = styled.button`
  border: 2px solid #007d8a;
  background: #eef9fa;
  color: #007d8a;
  &:hover {
    background: #eef9fa;
  }
  width: 10rem;
`;

const DownloadPrivacyButton = styled.button`
  border: 2px solid #80519f;
  background: #f2e9f5;
  color: #80519f;
  &:hover {
    background: #f2e9f5;
  }
`;

interface TermsModalProps {
  onClose: () => void;
  fileUrl: string; // The URL of the file to display
  title: string; // Title to show in modal header
}

const TermsModal: React.FC<TermsModalProps> = ({ onClose, fileUrl, title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <Title>{title}</Title>
          <TopActions>
            <DownloadButton onClick={() => window.open(fileUrl, "_blank")}>
              Download ⬇
            </DownloadButton>
          </TopActions>
        </ModalHeader>

        <ModalContent>
          <iframe src={fileUrl} width="95%" height="500px"></iframe>
        </ModalContent>

        <BottomActions>
          <CloseButton onClick={onClose}>Close</CloseButton>
          <AgreeButton onClick={onClose}>Agree</AgreeButton>
        </BottomActions>
      </ModalContainer>
    </Overlay>
  );
};

export default TermsModal;
