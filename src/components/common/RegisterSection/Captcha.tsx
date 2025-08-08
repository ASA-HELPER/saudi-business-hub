import React, { useEffect, useState } from 'react';
import {
  CaptchaContainer,
  CaptchaFrame,
  CaptchaLogo,
  PrivacyTerms
} from './styles/Captcha.styles';

const Captcha: React.FC = () => {
  const [showCaptcha, setShowCaptcha] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCaptcha(true);
    }, 1500); // 4 seconds

    return () => clearTimeout(timer); // Cleanup
  }, []);

  if (!showCaptcha) return null;

  return (
    <CaptchaContainer>
      <CaptchaFrame>
        <CaptchaLogo src="/assets/images/captcha.png" alt="Captcha Logo" />
        <PrivacyTerms>Privacy - Terms</PrivacyTerms>
      </CaptchaFrame>
    </CaptchaContainer>
  );
};

export default Captcha;
