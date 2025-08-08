import React from 'react';
import {
  LayoutContainer,
  Content,
} from './styles/Layout.styles';
import Header from './Header';
import EmailVerificationForm from './EmailVerificationForm';
import Footer from '../LoginSection/Footer';
// import Captcha from './Captcha';
import Captcha from '../LoginSection/Captcha';

const EmailVerificationComponent: React.FC = () => {
  return (
    <LayoutContainer>
      <Content>
        <EmailVerificationForm />
        <Captcha />
      </Content>
      <Footer linkName="Login" linkPath="/login"/>
    </LayoutContainer>
  );
};

export default EmailVerificationComponent;
