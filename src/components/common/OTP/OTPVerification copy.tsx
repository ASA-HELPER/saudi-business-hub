import React, { useState } from 'react';
import ReusableOTPBox from '../../generic/Input/ResuableOTPBox';
import Button from '../../generic/Button/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  margin-bottom: 28px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: clamp(16px, 1.8vw, 28px);
  color: #0C3957;
  text-align: center;
  width: 100%;
`;

const AndDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: #999;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #ccc;
  }

  &::before {
    margin-right: 12px;
  }

  &::after {
    margin-left: 12px;
  }
`;

type IdentifierType = 'mobile' | 'email';

interface OTPVerificationProps {
  identifiers: { type: IdentifierType; value: string }[];
  onComplete: (type: IdentifierType, otp: string) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ identifiers, onComplete }) => {
  const [otpValues, setOtpValues] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const showDivider = identifiers.length > 1;

  const handleOtpChange = (type: IdentifierType, otp: string) => {
    setOtpValues(prev => ({ ...prev, [type]: otp }));
  };

  const handleVerify = () => {
    // Call onComplete for each identifier
    identifiers.forEach(item => {
      const otp = otpValues[item.type];
      if (otp && otp.length > 0) {
        onComplete(item.type, otp);
      }
    });
    // Navigate after verification
    navigate('/dashboard');
  };

  return (
    <Wrapper>
      <Title>Two factor <br/>Authentication</Title>
      {identifiers.map((item, index) => (
        <React.Fragment key={item.type}>
          <ReusableOTPBox
            identifier={item.value}
            identifierType={item.type}
          //  onChange={(otp: string) => handleOtpChange(item.type, otp)}
            onComplete={() => {}}
          />
          {showDivider && index === 0 && <AndDivider>or</AndDivider>}
        </React.Fragment>
      ))}
      <Button text="Verify OTP" onClick={handleVerify} />
       <Button
            text="Back to login"
            onClick={() => navigate('/login')}
            variant="outlined" color="#007C92"
          />
    </Wrapper>
  );
};

export default OTPVerification;
