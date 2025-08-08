import React, { useState, useEffect } from 'react';
import ReusableOTPBox from '../../generic/Input/ResuableOTPBox';
import Button from '../../generic/Button/Button';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostLoginError,
  selectPostLoginUser,
} from "../../../store/selectors/loginOtpDataSelectors";
import {
  selectLoginUser,
} from "../../../store/selectors/loginSelectors";
import { LoginOtpRequest } from "../../../store/actions/LoginOtpVerifyAction";
import { useLoading } from "../../generic/Loader/LoadingContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  margin-bottom: 16px;
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 600;
  font-size: clamp(16px, 1.8vw, 28px);
  color: #0C3957;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: 4px;
`;


const StyledText = styled.div`
  font-family: 'IBM Plex Sans Arabic', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  color: #3e4448;
  width: 100%;
  max-width: clamp(280px, 90%, 540px);
  white-space: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  flex-shrink: 1;
  flex-grow: 0;
`;



const FormWrapper = styled.div`
  margin: 0;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px; /* space between buttons */
  margin-top: 24px;
  flex-wrap: wrap; /* for responsiveness */
`;

type IdentifierType = 'mobile' | 'email';

interface OTPVerificationProps {
  identifiers: { type: IdentifierType; value: string }[];
  onComplete: (type: IdentifierType, otp: string) => void;
}

// Utility functions for masking
const maskEmail = (email: string) => {
  const [user, domain] = email.split('@');
  const visible = user.slice(0, 3);
  return `${visible}*****@${domain}`;
};

const maskPhone = (phone: string) => {
  return phone.slice(0, 2) + "*****" + phone.slice(-3);
};

const OTPVerification: React.FC<OTPVerificationProps> = ({ identifiers, onComplete }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    unregister,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();
  const { setIsLoading } = useLoading();
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const user = useSelector(selectLoginUser);
  const userOtp = useSelector(selectPostLoginUser);
  const loginOtpError = useSelector(selectPostLoginError);

  const email = user?.email ? maskEmail(user.email) : '';
  const phone = user?.phone ? maskPhone(user.phone) : '';

  useEffect(() => {
    register("otp", { required: "OTP is required", minLength: 6, maxLength: 6 });
  }, [register]);

  useEffect(() => {
    if (loginOtpError) {
      toast(loginOtpError.message);
      setIsLoading(false);
    }
  }, [loginOtpError, setIsLoading]);

  useEffect(() => {
    if (userOtp?.token) {
      setIsLoading(false);
      toast.success("Login successful!");
      navigate('/dashboard');
    }
  }, [userOtp, setIsLoading, navigate]);

  const onSubmit = async (data: any) => {
    if (data.otp && data.otp.length === 6) {
      setIsLoading(true);
      dispatch(
        LoginOtpRequest({
          token: user?.token,
          otp: data.otp,
          purpose: "login",
        })
      );
    } else {
      console.warn("OTP is invalid or incomplete");
    }
  };

        return (
        <FormWrapper>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Title>Two Factor Authentication</Title>
          <StyledText>
            We have sent a verification code to your registered email and mobile&nbsp;
            <strong>{email} & {phone}</strong>
          </StyledText>

          <ReusableOTPBox
            identifier={identifiers[0].value}
            identifierType={identifiers[0].type}
            onComplete={(value: string) => {
              setOtp(value);
              setValue("otp", value);
              clearErrors("otp");
            }}
          />

    <ButtonGroup>
      <Button text="Submit" />
      <Button
        text="Back"
        onClick={() => navigate('/login')}
        variant="outlined"
        color="#007C92"
      />
    </ButtonGroup>
      </StyledForm>
    </FormWrapper>
  );
};

export default OTPVerification;
