import React, { useState } from 'react';
import { BackButtonWrapper, BackButton, FooterFixedWrapper } from './BackButtonWrap.styles';
import Modal from '../../generic/Modal/Modal';

interface BackButtonWrapProps {
  title?: string;
  onBackClick?: () => void;
}

const BackButtonWrap: React.FC<BackButtonWrapProps> = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <BackButtonWrapper>
        {/* <BackButton onClick={() => setShowModal(true)} aria-label="Go back">
          <img
            src="/assets/images/back.png"
            alt="Back arrow"
            width={26}
            height={26}
          />
        </BackButton> */}

      </BackButtonWrapper>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          console.log('Confirmed action');
          setShowModal(false);
        }}
        title="Leave Login?"
        description="Are you sure you want to leave? Your login progress will be lost."
        iconSrc="/assets/images/leave.png"
        confirmText="Yes"
        cancelText="No"
      />

      {/* <FooterFixedWrapper>
       <Footer />
      </FooterFixedWrapper> */}
    </>
  );
};

export default BackButtonWrap;
