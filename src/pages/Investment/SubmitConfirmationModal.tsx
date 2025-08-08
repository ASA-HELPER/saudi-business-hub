import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: white;
  width: 90%;
  max-width: 600px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  background: #e7f3f6;
  padding: 1.5rem;
  font-weight: bold;
  font-size: 1.25rem;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #333;
  background: #f5fafa;
`;

const ArabicText = styled.p`
  direction: rtl;
  text-align: right;
  margin-bottom: 1.5rem;
  font-family: "Tahoma", sans-serif;
  color: #333;
`;

const EnglishText = styled.p`
  direction: ltr;
  text-align: left;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.25rem;
  background: #fff;
  border-top: 1px solid #eee;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 28px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  border: ${(props) => (props.primary ? "none" : "2px solid #0891b2")};
  background: ${(props) => (props.primary ? "#0891b2" : "#ffffff")};
  color: ${(props) => (props.primary ? "#ffffff" : "#0891b2")};
  cursor: pointer;
`;

const SubmitConfirmationModal = ({
  onClose,
  onAgree,
}: {
  onClose: () => void;
  onAgree: () => void;
}) => {
  return (
    <Overlay>
      <Modal>
        <Header>
          <span>SUBMIT CONFIRMATION</span>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <Content>
          <ArabicText>
            يلتزم المتقدم، بدفع المقابل المالي للتسجيل / التحديث السنوي – لاحقاً
            – وفقاً لما تحدده الوزارة عند قبول الطلب. على أن يلتزم بالسداد خلال
            مدة لا تتجاوز (خمسة عشر) يوم عمل من إشعاره بالقيمة المستحقة للخدمة
            وإلا عُدّ التسجيل لاغياً.
          </ArabicText>
          <EnglishText>
            The applicant commits to paying the registration / annual update fee
            later, as determined by the ministry upon approval of the
            application. Payment must be made within a period not exceeding
            fifteen (15) business days from the date of notification of the due
            amount for the service; otherwise, the registration will be
            considered void.
          </EnglishText>
        </Content>
        <Footer>
          <Button onClick={onClose}>Close</Button>
          <Button primary onClick={onAgree}>
            Agree
          </Button>
        </Footer>
      </Modal>
    </Overlay>
  );
};

export default SubmitConfirmationModal;
