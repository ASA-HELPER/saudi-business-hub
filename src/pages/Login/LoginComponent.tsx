import React, { useState } from 'react';
import AuthLayout from '../../components/generic/AuthLayout/AuthLayout';
import LanguageSelector from '../../components/generic/LanguageSwitch/LanguageSelector';
import LoginFormComponent from '../../components/common/LoginSection/Layout'; 


const LoginComponent: React.FC = () => {  

  return (
   <AuthLayout leftSpace="15%" rightSpace="15%" LanguageSwitcher={<LanguageSelector />}>
      <LoginFormComponent />
   </AuthLayout>
  );
};

export default LoginComponent;
  