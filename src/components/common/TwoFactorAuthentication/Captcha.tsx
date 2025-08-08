import React from 'react';
import { CaptchaContainer, CaptchaFrame, CaptchaLogo, PrivacyTerms } from './styles/Captcha.styles';

const Captcha: React.FC = () => {
  return (
    <CaptchaContainer>
      <CaptchaFrame>
        <CaptchaLogo 
          src="/assets/images/captcha.png" 
          alt="Captcha Logo" 
        />
        <PrivacyTerms>Privacy - Terms</PrivacyTerms>
      </CaptchaFrame>
    </CaptchaContainer>
  );
};

export default Captcha;
