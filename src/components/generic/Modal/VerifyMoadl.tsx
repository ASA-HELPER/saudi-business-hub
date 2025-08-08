import React, { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  ModalContent,
  IconContainer,
  TextContainer,
  ModalTitle,
  ModalDescription,
  ButtonContainer,
  ButtonOutline,
  ButtonFilled,
} from './Modal.styles';

interface VerifyMoadlProps {
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: string;
  iconSrc?: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode; // Optional: for full customization
}

const VerifyMoadl: React.FC<VerifyMoadlProps> = ({
  show,
  onClose,
  onConfirm,
  title = 'Verify Email',
  description = '',
  iconSrc,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  children,
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(show);
  const [animateOut, setAnimateOut] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (show) {
      setVisible(true);
      setAnimateOut(false);
    } else {
      setAnimateOut(true);
      setTimeout(() => {
        setVisible(false);
        setAnimateOut(false);
      }, 300);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <ModalOverlay show={!animateOut}>
      <ModalContainer animateOut={animateOut}>
        <CloseButton onClick={onClose}>
          <img
            src="/assets/images/modal-close.png"
            alt="Close"
            width="23"
            height="23"
          />
        </CloseButton>

        <ModalContent>
          {iconSrc && (
            <IconContainer>
              <img src={iconSrc} alt="Icon" width="62" height="62" />
            </IconContainer>
          )}

          <TextContainer>
            <ModalTitle>{title}</ModalTitle>
            {description && <ModalDescription>{description}</ModalDescription>}
          </TextContainer>

          {children}

        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default VerifyMoadl;
