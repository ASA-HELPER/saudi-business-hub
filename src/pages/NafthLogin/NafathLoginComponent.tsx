import React, { useState } from 'react';
import AuthLayout from '../../components/generic/AuthLayout/AuthLayout';
import LanguageSelector from '../../components/generic/LanguageSwitch/LanguageSelector';
import NafathLoginFormComponent from '../../components/common/NafthLoginSection/Layout'; 

const NafathLoginComponent: React.FC = () => {  

  return (
   <AuthLayout leftSpace="15%" rightSpace="15%" LanguageSwitcher={<LanguageSelector />}>
      <NafathLoginFormComponent />
   </AuthLayout>
  );
};

export default NafathLoginComponent;
