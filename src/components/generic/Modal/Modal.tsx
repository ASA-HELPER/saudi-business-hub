import React, { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from "../../../assets/images/Close.svg";

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

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title?: string;
  description?: ReactNode;
  iconSrc?: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode; // Optional: for full customization
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  onConfirm,
  title = 'Are you sure?',
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
          <img src={CloseIcon} alt="Close" />
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

         {onConfirm && (
          <ButtonContainer>
            <ButtonOutline onClick={() => {
                handleBack();
                onConfirm();
              }}>
                {confirmText}
              </ButtonOutline>
            <ButtonFilled onClick={onClose}>{cancelText}</ButtonFilled>
          </ButtonContainer>
        )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
