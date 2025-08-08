import React from 'react';
import {
  LayoutContainer,
  Content,
} from './styles/Layout.styles';
import Header from './Header';
import OTPForm from './OTPVerification';
import Footer from '../AuthForm/Footer/Footer';
// import Captcha from './Captcha';
import Captcha from '../LoginSection/Captcha';

const OTPFormComponent: React.FC = () => {
  return (
    <LayoutContainer>
      <Content>
        {/* <OTPForm /> */}
        <Captcha />
        <Footer />
      </Content>
    </LayoutContainer>
  );
};

export default OTPFormComponent;
