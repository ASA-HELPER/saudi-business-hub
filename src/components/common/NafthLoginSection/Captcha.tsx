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
    <CaptchaContainer  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}>
      <CaptchaFrame>
        <CaptchaLogo src="/assets/images/captcha.png" alt="Captcha Logo" />
        <PrivacyTerms>Privacy - Terms</PrivacyTerms>
      </CaptchaFrame>
    </CaptchaContainer>
  );
};

export default Captcha;
