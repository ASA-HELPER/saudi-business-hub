import React from 'react';
import {
  LayoutContainer,
  Content,
} from './styles/Layout.styles';
import ForgotPasswordForm from './ForgotPasswordForm';
import Footer from '../LoginSection/Footer';
import { useTranslation } from "react-i18next";

const LoginFormComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LayoutContainer>
      <Content>
        <ForgotPasswordForm />
      </Content>
      <Footer 
        linkName={t("forgot_password.login_button")}  // Use translated text
        linkPath="/login"  
        showFacingIssue={true}
      />
    </LayoutContainer>
  );
};

export default LoginFormComponent;