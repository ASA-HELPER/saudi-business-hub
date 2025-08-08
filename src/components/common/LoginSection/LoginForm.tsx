import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ReusableInput from "../../generic/Input/ResuableInput";
import Button from "../../generic/Button/Button";
import BackButton from "../../generic/Button/BackButton";
import LoginExtras from "./LoginExtras";
import NafathButton from "../../generic/Button/LoginButton/LoginButton";
import Footer from "./Footer";
import userIcon from "../../../assets/images/user.png";
import lockIcon from "../../../assets/images/lock.png";
import checkBox from "../../../assets/images/register/Check.png";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginError,
  selectLoginUser,
} from "../../../store/selectors/loginSelectors";
import { loginRequest } from "../../../store/actions/loginActions";
import { useLoading } from "../../generic/Loader/LoadingContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { sendOTP } from "./SendOTP";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    unregister,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsLoading } = useLoading();
  const user = useSelector(selectLoginUser);
  const loginError = useSelector(selectLoginError);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const username = watch("username");
  const password = watch("password");
  const nafath = watch("nafth-login");
  const [rememberMe, setRememberMe] = useState(false);
  const enableStandardLogin = username && password && !nafath;
  const enableNafathLogin = nafath && !username && !password;

  useEffect(() => {
    if (username || password) {
      setValue("nafth-login", "");
      clearErrors("nafth-login");
      unregister("nafth-login");
    } else if (nafath) {
      setValue("username", "");
      setValue("password", "");
      clearErrors(["username", "password"]);
      unregister(["username", "password"]);
    }
  }, [username, password, nafath, setValue, clearErrors, unregister]);

  useEffect(() => {
    const verifyCaptcha = async () => {
      if (!executeRecaptcha) return;

      if (enableStandardLogin || enableNafathLogin) {
        const token = await executeRecaptcha("login");
        setRecaptchaToken(token);
      } else {
        setRecaptchaToken(null);
      }
    };

    verifyCaptcha();
  }, [enableStandardLogin, enableNafathLogin, executeRecaptcha]);

  useEffect(() => {
    if (user?.token) {
      setIsLoading(false);
      navigate("/login/otp-verify");
    }
  }, [user, navigate, setIsLoading]);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError.message);
      setIsLoading(false);
      // toast.error("Login failed: " + loginError); // Optional
    }
  }, [loginError, setIsLoading]);

  // Form Submit
  const onSubmit = async (data: any) => {
    setIsLoading(true);

    if (!recaptchaToken) {
      alert("reCAPTCHA verification failed. Please try again.");
      setIsLoading(false);
      return;
    }

    if (enableStandardLogin) {
      dispatch(
        loginRequest({
          username: data.username,
          password: data.password,
          captchaToken: recaptchaToken,
        })
      );
    } else if (enableNafathLogin) {
      console.log("Nafath login flow:", data, recaptchaToken);
      // simulate async loading until backend implemented
      setTimeout(() => {
        setIsLoading(false);
        // Navigate or handle post-login action here
      }, 1000);
    }
  };

  return (
    <FormWrapper>
      <Title>{t("login.title")}</Title>

      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        {/* Username */}
        <ReusableInput
          label={t("login.username")}
          name="username"
          placeholder={t("login.username_placeholder")}
          icon={userIcon}
          register={register}
          validationRules={
            !nafath
              ? {
                  required: "Please enter your valid username",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                }
              : {}
          }
          error={errors.username}
          disabled={!!nafath}
        />

        {/* Password */}
        <ReusableInput
          label={t("login.password")}
          name="password"
          placeholder={t("login.password_placeholder")}
          icon={lockIcon}
          isPassword
          register={register}
          validationRules={
            !nafath
              ? {
                  required: "Please enter your correct password",
                  minLength: {
                    value: 8,
                    message: "Password must be more than 8 characters",
                  },
                }
              : {}
          }
          error={errors.password}
          disabled={!!nafath}
        />

        <LoginExtrasWrapper>
          <CheckboxContainer onClick={() => setRememberMe(!rememberMe)}>
            <StyledCheckbox checked={rememberMe}>
              <img src={checkBox} alt="checkmark" />
            </StyledCheckbox>
            <CheckboxLabel>{t("login.remember_me")}</CheckboxLabel>
          </CheckboxContainer>

          <ForgotPassword onClick={() => navigate("/forget-password")}>
            {t("login.forgot_password")}
          </ForgotPassword>
        </LoginExtrasWrapper>

        {/* Standard Login Button */}
        <Button
          text={t("login.button")}
          disabled={!enableStandardLogin || !recaptchaToken}
        />

        <div id="recaptcha-container"></div>

        {/* Divider */}
        <OrDivider>{t("login.or")}</OrDivider>
        <LoginExtras />

        {/* Nafath Login Button */}

        <NafathButton
          text={t("login.nafath_button")}
          onClick={() => navigate("/nafath-login")}
        />

        {/* Back Button */}
        <CenteredField>
          <BackButton
            text={t("login.back")}
            color="#0c3957"
            onClick={() => navigate(-1)}
          />
        </CenteredField>
        <CenteredField>
          <Footer linkName={t("login.register")} linkPath="/register" />
        </CenteredField>
      </StyledForm>
    </FormWrapper>
  );
};

export default LoginForm;

//
// Styled Components
//

const FormWrapper = styled.div`
  margin: 0;
`;

const StyledForm = styled.form`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font weight: 400;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
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

const CenteredField = styled.div`
  margin: 0 auto;
`;

const LoginExtrasWrapper = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RememberMe = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #4a4a4a;

  input {
    margin-right: 8px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CheckboxLabel = styled.span`
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #384250;
  margin-left: 8px;
  margin-right: 8px;
`;

const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  padding: 4px;
  border-radius: 4px;
  background: ${(props) => (props.checked ? "#00778e" : "#ffffff")};
  border: 1px solid ${(props) => (props.checked ? "#00778e" : "#cccccc")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.checked ? "#006177" : "#f5f5f5")};
  }

  img {
    width: 16px;
    height: 16px;
    display: ${(props) => (props.checked ? "block" : "none")};
  }
`;

const ForgotPassword = styled.a`\
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #00778E;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const OrDivider = styled.div`
  display: flex;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 400;
  width: clamp(280px, 30vw, 638px);
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: #999;

  &::before,
  &::after {
    content: "";
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
