import React, { useState } from 'react';
import { HeaderContainer, BackButtonWrapper, BackButton, Title } from './styles/Header.styles';
import Modal from '../../generic/Modal/Modal';

interface HeaderProps {
  title?: string;
  onBackClick?: () => void;
}



const Header: React.FC<HeaderProps> = ({
  title = 'FORGOT PASSWORD',
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <HeaderContainer>
      <BackButtonWrapper>
        <BackButton   onClick={() => setShowModal(true)} aria-label="Go back">
          <img
            src="/assets/images/back.png"
            alt="Back arrow"
            width={26}
            height={26}
          />
        </BackButton>
      </BackButtonWrapper>
      <Title>{title}</Title>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          console.log('Confirmed action');
          setShowModal(false);
        }}
        title="Cancel Password Reset?"
        description="Do you want to leave this page? You’ll need to start the reset process again."
        iconSrc="/assets/images/leave.png"
        confirmText="Yes"
        cancelText="No"
      />
    </HeaderContainer>
  );
};

export default Header;
