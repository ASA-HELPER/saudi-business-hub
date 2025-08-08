import React, { useState } from 'react';
import AuthLayout from '../../components/common/Auth/AuthLayout';
import EmailVerificationComponent from '../../components/common/EmailVerificationSection/Layout';

const EmailVerify: React.FC = () => {  

  return (
      <AuthLayout>
        <EmailVerificationComponent />
      </AuthLayout>
  );
};

export default EmailVerify;
