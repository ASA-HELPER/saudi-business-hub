import React, { useState } from 'react';
import AuthLayout from '../../components/generic/AuthLayout/AuthLayout';
import LanguageSelector from '../../components/generic/LanguageSwitch/LanguageSelector';
import  OTPFormComponent from '../../components/common/OTP/Layout'; 

const OTPVerify: React.FC = () => {  

  return (
      <AuthLayout leftSpace="30%" rightSpace="30%" LanguageSwitcher={<LanguageSelector />}>
        <OTPFormComponent />
      </AuthLayout>
  );
};

export default OTPVerify;
