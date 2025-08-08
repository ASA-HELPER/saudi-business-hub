import React, { useState } from 'react';
import AuthLayout from '../../components/common/Auth/AuthLayout';
import EmailVerificationComponent from '../../components/common/EmailVerificationSection/Layout';
import VerifyMoadl from '../../components/generic/Modal/VerifyMoadl';
import { useNavigate } from 'react-router-dom';

const EmailverifySuccess: React.FC = () => {  
  const navigate = useNavigate();
  const [showModal , setShowModal] = useState(true)

  return (
      <AuthLayout>
        <EmailVerificationComponent />

         <VerifyMoadl
        show={showModal}
        onClose={() =>{ navigate('/login/otp-verify'); setShowModal(false)}}
        onConfirm={() => {
          console.log('Confirmed action');
          setShowModal(false);
        }}
        description="Verification email have been sent to your email address.
                Please contact customer support if you require additional assistance."
        iconSrc="/assets/images/warning.png"
      />

      </AuthLayout>

      
  );
};

     

export default EmailverifySuccess;
