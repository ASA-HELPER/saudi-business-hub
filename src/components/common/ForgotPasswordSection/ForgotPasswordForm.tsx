import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled, { keyframes } from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../generic/Loader/LoadingContext";
import ReusableInput from "../../generic/Input/ResuableInput";
import Button from "../../generic/Button/Button";
import BackButton from "../../generic/Button/LoginButton/LoginButton";
import vector from "../../../assets/images/mail-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  selectForgotPasswordError,
  selectForgotPasswordLoading,
  selectForgotPasswordSuccess,
} from "../../../store/selectors/forgotPasswordSelectors";
import { forgotPasswordRequest } from "../../../store/actions/forgotPasswordActions";

const FormWrapper = styled.div`
  margin-top: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;

const CenteredField = styled.div`
  // margin: 0 auto;
`;

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const Paragraph = styled.p`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  margin-top: 15px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #3e4448;
  animation: ${fadeIn} 0.4s ease-in-out;
`;

const Title = styled.h1`
  margin-bottom: 28px;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 700;
  font-size: clamp(16px, 1.8vw, 28px);
  color: #0c3957;
  text-align: center;
  width: 100%;
`;

const ParagraphWrapper = styled.div`
  width: 100%;
  margin: 0 auto 40px;
`;

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const { setIsLoading } = useLoading();
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectForgotPasswordLoading);
  const successMessage = useSelector(selectForgotPasswordSuccess);
  const error = useSelector(selectForgotPasswordError);

 const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: any) => {
    setIsLoading(true);
    dispatch(forgotPasswordRequest(data.email));
  };

  useEffect(() => {
    if (successMessage) {
      setIsLoading(false);
      setSubmitted(true);
      reset();
    }
  }, [successMessage, reset]);

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
        toast.error(t("forgot_password.generic_error"));
      }
    }
  }, [error]);

  return (
    <FormWrapper>
      <Title>{t("forgot_password.title")}</Title>

      <ParagraphWrapper>
        <Paragraph>
          {submitted
            ? t("forgot_password.success_message")
            : t("forgot_password.instructions")}
        </Paragraph>
      </ParagraphWrapper>

      {!submitted ? (
        <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <CenteredField>
            <ReusableInput
              label={t("forgot_password.email_label")}
              name="email"
              placeholder={t("forgot_password.email_placeholder")}
              icon={vector}
              register={register}
              validationRules={{
                required: t("forgot_password.validation.email_required"),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: t("forgot_password.validation.email_invalid"),
                },
              }}
              error={errors.email}
            />
          </CenteredField>

          <CenteredField>
            <Button 
              text={t("forgot_password.submit_button")} 
              disabled={!isValid} 
            />
          </CenteredField>

          <CenteredField style={{ marginTop: "30px" }}>
            <BackButton
              text={t("forgot_password.back_button")}
              showLogo={false}
              onClick={() => navigate(-1)}
            />
          </CenteredField>
        </StyledForm>
      ) : (
        <ParagraphWrapper>
          <Paragraph>
            <Button 
              text={t("forgot_password.Back_login_button")}
              onClick={() => navigate("/login")} 
            />
          </Paragraph>
        </ParagraphWrapper>
      )}
    </FormWrapper>
  );
};

export default ForgetPasswordForm;