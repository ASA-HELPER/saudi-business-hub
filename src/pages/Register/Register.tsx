import React, { useState } from "react";
import AuthLayout from "../../components/generic/AuthLayout/AuthLayout";
import LanguageSelector from "../../components/generic/LanguageSwitch/LanguageSelector";
import RegisterFormComponent from "../../components/common/RegisterSection/Layout";

const Register: React.FC = () => {
  return (
    <AuthLayout
      leftSpace="25%"
      rightSpace="25%"
      LanguageSwitcher={<LanguageSelector />}
    >
      <RegisterFormComponent />
    </AuthLayout>
  );
};

export default Register;
