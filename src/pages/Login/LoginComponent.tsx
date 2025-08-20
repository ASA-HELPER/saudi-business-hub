import React, { useState } from "react";
import AuthLayout from "../../components/generic/AuthLayout/AuthLayout";
import LanguageSelector from "../../components/generic/LanguageSwitch/LanguageSelector";
import LoginFormComponent from "../../components/common/LoginSection/Layout";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const LoginComponent: React.FC = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6Lf843UrAAAAAAKhYaqUv5mBXF5hBwU0vPiZF84x">
      <AuthLayout
        leftSpace="15%"
        rightSpace="15%"
        LanguageSwitcher={<LanguageSelector />}
      >
        <LoginFormComponent />
      </AuthLayout>
    </GoogleReCaptchaProvider>
  );
};

export default LoginComponent;
