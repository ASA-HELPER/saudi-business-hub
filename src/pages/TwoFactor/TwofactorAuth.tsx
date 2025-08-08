import React, { useState } from 'react';
import AuthLayout from '../../components/common/Auth/AuthLayout';
import EmailVerificationComponent from '../../components/common/EmailVerificationSection/Layout';

const TwofactorAuth: React.FC = () => {  

  return (
      <AuthLayout>
        <EmailVerificationComponent />
      </AuthLayout>
  );
};

export default TwofactorAuth;
