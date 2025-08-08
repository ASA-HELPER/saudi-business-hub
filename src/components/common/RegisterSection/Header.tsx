import React, { useState } from 'react';
import { HeaderContainer, BackButtonWrapper, BackButton, Title } from './styles/Header.styles';
import Modal from '../../generic/Modal/Modal';

interface HeaderProps {
  title?: string;
  onBackClick?: () => void;
}



const Header: React.FC<HeaderProps> = ({
   title = 'REGISTER',
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
        title="Exit Register?"
        description="Are you sure you want to go back? Entered details will not be saved."
        iconSrc="/assets/images/leave.png"
        confirmText="Yes"
        cancelText="No"
      />
    </HeaderContainer>
  );
};

export default Header;
