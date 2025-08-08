import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  box-sizing: border-box;
`;

export const Text = styled.p`
  margin: 0;
  padding: 0;
`;

// 🔷 Container with responsive width and spacing
const Container = styled(Box)`
  display: flex;
  margin-top:20px;
  flex-direction: column;
  gap: clamp(16px, 2vw, 24px);
  width: clamp(320px, 40vw, 538px);
  align-items: center;
`;

// 🔷 Heading with responsive font size
const Heading = styled.h2`
  font-family: "IBM Plex Sans Arabic", sans-serif;;
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 600;
  text-align: center;
  color: #121212;
  margin: 0;
`;

// 🔷 StyledText with responsive font and width
const StyledText = styled(Text)`
  font-family: "IBM Plex Sans Arabic", sans-serif;;
  font-weight: 500;
  font-size: clamp(14px, 1.2vw, 18px);
  line-height: 1.5;
  text-align: center;
  color: #3e4448;
  width: 100%;
  max-width: clamp(280px, 90%, 540px);
`;

//  OTP Box Container
const OTPContainer = styled(Box)`
  display: flex;
  gap: clamp(8px, 1.2vw, 16px);
  justify-content: center;
  width: clamp(280px, 80%, 416px);
  height: 56px;
  margin: 0 auto;
`;

//  OTP Input with error support and responsiveness
const OTPInput = styled.input<{ hasError?: boolean }>`
  width: clamp(40px, 5vw, 56px);
  height: clamp(40px, 5vw, 56px);
  border: 1px solid ${({ hasError }) => (hasError ? '#CC3434' : '#e0e0e0')};
  border-radius: 8px;
  text-align: center;
  font-size: clamp(18px, 2vw, 24px);
  outline: none;
  padding: 0;

  &:focus {
    border-color: ${({ hasError }) => (hasError ? '#CC3434' : '#02778f')};
    box-shadow: ${({ hasError }) =>
      hasError
        ? '0 0 0 2px rgba(204, 52, 52, 0.2)'
        : '0 0 0 2px rgba(33, 150, 243, 0.2)'};
  }
`;

//  Resend link
const ResendText = styled(Text)`
  font-family: "IBM Plex Sans Arabic", sans-serif;;
  font-weight: 500;
  font-size: clamp(14px, 1.4vw, 18px);
  line-height: 30px;
  text-align: center;
  color: #3e4448;
  cursor: pointer;
  margin-top: clamp(16px, 2vh, 24px);

  &:hover {
    color: #02778f;
  }
`;

//  Error message
const ErrorMessage = styled.div`
  color: #CC3434;
  font-weight: 500;
  font-size: clamp(12px, 1vw, 14px);
  margin-top: clamp(6px, 1vh, 8px);
  text-align: center;
`;


interface ResuableOTPBoxProps {
  identifier?: string;
  identifierType?: 'email' | 'mobile';
  onComplete?: (code: string) => void;
  resendDelay?: number;
  onResend?: () => void;
}

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes} min : ${seconds.toString().padStart(2, '0')} sec`;
};

const ResuableOTPBox: React.FC<ResuableOTPBoxProps> = ({
  identifier = 'omarmajid@gmail.com',
  identifierType = 'email',
  onComplete = () => {},
  resendDelay = 420,
  onResend = () => {}
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState(resendDelay);
  const [error, setError] = useState<string>(''); 
  const inputRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      // Auto-focus next
      if (value && index < 5) {
        inputRefs[index + 1].current?.focus();
      }

      // Check if all digits are filled
      const fullCode = newOtp.join('');
      const allFilled = newOtp.every(d => d !== '');
      if (allFilled && fullCode.length === 6) {
        onComplete(fullCode);  //  Send to parent for real validation
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      setError('');
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleResend = () => {
    if (countdown === 0) {
      setCountdown(resendDelay);
      setOtp(Array(6).fill(''));
      setError('');
      onResend();
    }
  };

  return (
    <Container>
      <OTPContainer>
        {otp.map((digit, index) => (
          <OTPInput
            key={index}
            ref={inputRefs[index]}
            type="text"
            maxLength={1}
            inputMode="numeric"
            pattern="\d*"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            hasError={!!error}
          />
        ))}
      </OTPContainer>

      {error && <ErrorMessage>{error}</ErrorMessage>} 

      <ResendText onClick={handleResend}>
        Resend OTP <strong>{formatTime(countdown)}</strong>
      </ResendText>
    </Container>
  );
};



export default ResuableOTPBox;
