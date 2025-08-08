import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useLoading } from "../../generic/Loader/LoadingContext";
import ReusableInputBig from "../../generic/Input/ResuableInput";
import Button from "../../generic/Button/Button";
import lockIcon from "../../../assets/images/lock.png";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import {
  selectResetPasswordError,
  selectResetPasswordLoading,
  selectResetPasswordSuccess,
} from "../../../store/selectors/resetPasswordSelectors";
import { resetPasswordRequest } from "../../../store/actions/resetPasswordActions";

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { setIsLoading } = useLoading();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(selectResetPasswordLoading);
  const successMessage = useSelector(selectResetPasswordSuccess);
  const error = useSelector(selectResetPasswordError);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [queryParams, setQueryParams] = useState({ token: "", email: "" });

  const password = watch("password");

  // 1. Get token and email from query string
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token") || "";
    const email = params.get("email") || "";

    if (token && email) {
      setQueryParams({ token, email });
    } else {
      toast.error("Invalid reset password link.");
      navigate("/");
    }
  }, [navigate]);

  // 2. Run recaptcha verification once on mount
  useEffect(() => {
    const verifyCaptcha = async () => {
      if (!executeRecaptcha) return;
      const token = await executeRecaptcha("reset_password");
      setRecaptchaToken(token);
    };
    verifyCaptcha();
  }, [executeRecaptcha]);

  // 3. Handle success
  useEffect(() => {
    if (successMessage) {
      setIsLoading(false);
      toast.success(successMessage);
      setTimeout(() => navigate("/login"), 1000); // redirect after success
    }
  }, [successMessage, navigate, setIsLoading]);

  // 4. Handle error
  useEffect(() => {
    if (error) {
      setIsLoading(false);

      if (error.message === "Validation Error" && error.errors) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(msg));
          }
        });
      } else if (typeof error.message === "string") {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }, [error, setIsLoading]);

  // 5. Submit Handler
  const onSubmit = async (data: any) => {
    if (!recaptchaToken) {
      toast.error("reCAPTCHA verification failed. Please try again.");
      return;
    }

    setIsLoading(true); // start loading

    const payload = {
      email: queryParams.email,
      token: queryParams.token,
      password: data.password,
      password_confirmation: data.confirmPassword,
      captchaToken: recaptchaToken,
    };

    dispatch(resetPasswordRequest(payload));
  };

  return (
    <FormWrapper>
      <Title>Reset Password</Title>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <ReusableInputBig
          label="New Password"
          name="password"
          placeholder="Enter New Password"
          icon={lockIcon}
          isPassword
          register={register}
          validationRules={{ required: "Password is required" }}
          error={errors.password}
        />

        <ReusableInputBig
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          icon={lockIcon}
          isPassword
          register={register}
          validationRules={{
            required: "Confirm Password is required",
            validate: (value: string) =>
              value === password || "Passwords do not match",
          }}
          error={errors.confirmPassword}
        />

        <Button text="Reset" />
      </StyledForm>
    </FormWrapper>
  );
};

export default ResetPasswordForm;

// ---------- Styled Components ----------

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

const Title = styled.h1`
  margin-bottom: 28px;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 600;
  font-size: clamp(16px, 1.8vw, 28px);
  color: #0c3957;
  text-align: center;
  width: 100%;
`;
