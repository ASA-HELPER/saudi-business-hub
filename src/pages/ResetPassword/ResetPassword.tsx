import React, { useState } from 'react';
import AuthLayout from '../../components/generic/AuthLayout/AuthLayout';
import LanguageSelector from '../../components/generic/LanguageSwitch/LanguageSelector';
import ResetPasswordFormComponent from '../../components/common/ResetPaswordSection/Layout'; 

const ResetPassword: React.FC = () => {  

  return (
       <AuthLayout leftSpace="30%" rightSpace="30%" LanguageSwitcher={<LanguageSelector />}>
        <ResetPasswordFormComponent />
      </AuthLayout>
  );
};

export default ResetPassword;
