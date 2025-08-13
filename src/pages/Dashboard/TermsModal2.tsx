import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Document, Page, pdfjs } from "react-pdf";
import HTMLFlipBook from "react-pageflip";

import termsPdf from "../../assets/pdf/terms_condition.pdf";
import leftArrow from "../../assets/images/arrow-left.svg";
import rightArrow from "../../assets/images/arrow-right.svg";
import downloadIcon from "../../assets/images/download.svg";
import { useTranslation } from "react-i18next";

// Set PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContainer = styled.div<{ $isRTL?: boolean }>`
  width: 95%;
  height: 90vh;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  direction: ${(props) => (props.$isRTL ? "rtl" : "ltr")};
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 14px 30px;
  position: relative;
`;

const ActionButtons = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  gap: 12px;
  position: absolute;
  ${(props) => (props.$isRTL ? "left: 150px" : "right: 150px")};
  top: 0px;

  button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const DownloadButton = styled.button`
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
`;

const PrivacyButton = styled.button`
  border: 2px solid #fff;
  background: transparent;
  color: #fff;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin-bottom: 50px;
`;

const ArrowButton = styled.div`
  margin: 0 20px;
  cursor: pointer;
`;

const Footer = styled.div<{ $isRTL?: boolean }>`
  display: flex;
  justify-content: center; 
  padding: 20px;
  gap: 16px;
  position: absolute;
  bottom: 0;
  width: 100%; 
  flex-direction: ${(props) => (props.$isRTL ? "row-reverse" : "row")};
`;


const CloseBtn = styled.button`
  border: 2px solid #007d8a;
  background: white;
  color: #007d8a;
  padding: 12px 48px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #eef9fa;
  }
`;

const AgreeBtn = styled.button`
  background: #00778e;
  color: white;
  border: none;
  padding: 12px 48px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: #006676;
  }
`;

const PageContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  padding: 0 4px;
`;

const FlipBookWrapper = styled.div`
  background: white;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TermsModal = ({ onClose }: { onClose: () => void }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pages, setPages] = useState<number[]>([]);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === "ar";

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPages(Array.from({ length: numPages }, (_, i) => i + 1));
  };

  const onPageRenderSuccess = (page: any) => {
    const viewport = page.getViewport({ scale: 1 });
    setPageWidth(viewport.width);
    setPageHeight(viewport.height - 200);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = termsPdf;
    link.download = t("termsModal.downloadFileName");
    link.click();
  };

  const handlePrivacyDownload = () => {
    const link = document.createElement("a");
    link.href = termsPdf; // Replace with actual privacy policy PDF
    link.download = t("termsModal.privacyFileName");
    link.click();
  };

  const flipNext = () => {
    bookRef.current?.pageFlip().flipNext();
  };

  const flipPrev = () => {
    bookRef.current?.pageFlip().flipPrev();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <Overlay>
      <ModalContainer $isRTL={isRTL}>
        <Header>
          <ActionButtons $isRTL={isRTL}>
            <DownloadButton onClick={handleDownload}>
              {t("termsModal.download")} <img src={downloadIcon} alt={t("termsModal.download")} />
            </DownloadButton>
            <PrivacyButton onClick={handlePrivacyDownload}>
              {t("termsModal.downloadPrivacyPolicy")} <img src={downloadIcon} alt={t("termsModal.download")} />
            </PrivacyButton>
          </ActionButtons>
        </Header>

        <ContentWrapper>
          <ArrowButton
            onClick={flipPrev}
            style={{
              opacity: currentPage === 0 ? 0.3 : 1,
              pointerEvents: currentPage === 0 ? "none" : "auto",
            }}
          >
            <img 
              src={isRTL ? rightArrow : leftArrow} 
              alt={t("termsModal.previousPage")} 
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            />
          </ArrowButton>

          <Document file={termsPdf} onLoadSuccess={onDocumentLoadSuccess}>
            {/* Hidden first page to capture size */}
            {pageWidth === 0 && (
              <Page
                pageNumber={1}
                onRenderSuccess={onPageRenderSuccess}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            )}

            {pageWidth > 0 && pageHeight > 0 && (
              <FlipBookWrapper>
                <HTMLFlipBook
                  width={pageWidth}
                  height={pageHeight}
                  size="fixed"
                  maxShadowOpacity={0.5}
                  showCover={false}
                  mobileScrollSupport={true}
                  drawShadow={true}
                  clickEventForward
                  ref={bookRef}
                  onFlip={handleFlip}
                  flippingTime={800}
                  disableFlipByClick={false}
                  style={{ backgroundColor: "#fff" }}
                  className={""}
                  startPage={0}
                  minWidth={0}
                  maxWidth={0}
                  minHeight={0}
                  maxHeight={0}
                  usePortrait={false}
                  startZIndex={0}
                  autoSize={false}
                  useMouseEvents={false}
                  swipeDistance={0}
                  showPageCorners={false}
                >
                  {pages.map((pageNumber) => (
                    <PageContainer key={pageNumber}>
                      <Page
                        pageNumber={pageNumber}
                        width={pageWidth}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    </PageContainer>
                  ))}
                </HTMLFlipBook>
              </FlipBookWrapper>
            )}
          </Document>

          <ArrowButton
            onClick={flipNext}
            style={{
              opacity: currentPage === numPages - 1 ? 0.3 : 1,
              pointerEvents: currentPage === numPages - 1 ? "none" : "auto",
            }}
          >
            <img 
              src={isRTL ? leftArrow : rightArrow} 
              alt={t("termsModal.nextPage")} 
              style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
            />
          </ArrowButton>
        </ContentWrapper>

        <Footer $isRTL={isRTL}>
          <CloseBtn onClick={onClose}>{t("termsModal.close")}</CloseBtn>
          <AgreeBtn onClick={onClose}>{t("termsModal.agree")}</AgreeBtn>
        </Footer>
      </ModalContainer>
    </Overlay>
  );
};

export default TermsModal;