import React, { useState } from 'react';
import AuthLayout from '../../components/generic/AuthLayout/AuthLayout';
import LanguageSelector from '../../components/generic/LanguageSwitch/LanguageSelector';
import ForgotPasswordFormComponent from '../../components/common/ForgotPasswordSection/Layout'; 

const ForgetPassword: React.FC = () => {  

  return (
       <AuthLayout leftSpace="30%" rightSpace="30%" LanguageSwitcher={<LanguageSelector />}>
        <ForgotPasswordFormComponent />
      </AuthLayout>
  );
};

export default ForgetPassword;
