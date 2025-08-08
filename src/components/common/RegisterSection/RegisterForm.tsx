import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ReusableInput from "../../generic/Input/ResuableInput";
import ReusableEmailValidationInput from "../../generic/Input/ReusableEmailValidationInput";
import ReusableMobileValidationInput from "../../generic/Input/ReusablePhoneValidationInput";
import ReusableSelect from "../../generic/Input/ResuableSelect";
import Button from "../../generic/Button/Button";
import BackButton from "../../generic/Button/LoginButton/LoginButton";
import AcknowledgeCheckBox from "./AcknowledgeCheckBox";
import ProgressMenu from "./ProgressMenu";
import userIcon from "../../../assets/images/user.png";
import lockIcon from "../../../assets/images/lock.png";
import { useDispatch, useSelector } from "react-redux";
import { selectCountryList } from "../../../store/selectors/countrySelectors";
import { fetchCountriesRequest } from "../../../store/actions/countryActions";
import { Country } from "../../../store/types/countryTypes";
import { fetchSectorsRequest } from "../../../store/actions/sectorActions";
import { selectSectorList } from "../../../store/selectors/sectorSelectors";
import { Sector } from "../../../store/types/sectorTypes";
import { registerRequest } from "../../../store/actions/registerActions";
import {
  selectRegisterLoading,
  selectRegisterSuccess,
  selectRegisterError,
} from "../../../store/selectors/registerSelector";
import { useLoading } from "../../generic/Loader/LoadingContext";
import { selectTitleList } from "../../../store/selectors/titleSelectors";
import { fetchTitlesRequest } from "../../../store/actions/titleActions";
import { Title } from "../../../store/types/titleTypes";
import {
  selectEmailVerifyOtpError,
  selectEmailVerifyOtpExpiresIn,
  selectEmailVerifyOtpLoading,
  selectEmailVerifyOtpToken,
} from "../../../store/selectors/sendEmailVerifyOtpSelectors";
import {
  ResetSendOtpFailure,
  sendEmailVerifyOtpRequest,
} from "../../../store/actions/sendEmailVerifyOtpActions";
import { verifyRegisterMailOtpRequest } from "../../../store/actions/emailOtpActions";
import {
  selectEmailOtpData,
  selectEmailOtpError,
  selectEmailOtpLoading,
  selectEmailOtpSuccess,
} from "../../../store/selectors/emailOtpSelectors";
import TermsModal from "../../../pages/Dashboard/TermsModal";
import termsPdf from "../../../assets/pdf/terms_condition.pdf";
import privacyPdf from "../../../assets/pdf/privacy_policy.pdf";
import { RESET_VERIFY_MAIL_OTP_STATE } from "../../../store/types/emailOtpTypes";
import { useTranslation, Trans } from "react-i18next";

const FormWrapper = styled.div`
  margin: 0;
`;

const RequiredMark = styled.span`
  color: #cc3434;
  margin-left: 2px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 24px;
`;
const SetpTwoButtonRow = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  flex-wrap: nowrap; /* <-- prevent line break */
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
`;

const Box = styled.div`
  flex: 1;
`;

const CenteredStepContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  width: 100%;
`;

const StepTwoContainer = styled.div`
  align-items: center;
`;

const slideVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
    width: "100%",
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: "relative",
    transition: { duration: 0.5 },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
    transition: { duration: 0.5 },
  }),
};

// const label = (
//   <>
//     I acknowledge reading and agreeing to the <a href="#">Terms & Conditions</a>{" "}
//     and <a href="#">Privacy Policy</a>, the validity and accuracy of the data
//     entered, and the Ministry's right to process it in a way that serves the
//     public interest and facilitates the provision of investment services.
//   </>
// );

interface RegisterFormProps {
  onSubmitSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmitSuccess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [direction, setDirection] = useState(1);
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(true);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [emailOtpFailed, setEmailOtpFailed] = useState(false);

  const dispatch = useDispatch();
  const countries = useSelector(selectCountryList);
  const sectors = useSelector(selectSectorList);
  const titles = useSelector(selectTitleList);

  useEffect(() => {
    dispatch(fetchCountriesRequest());
    dispatch(fetchSectorsRequest());
    dispatch(fetchTitlesRequest());
  }, [dispatch]);

  const [otpRequestCount, setOtpRequestCount] = useState(0);

  const countryOptions = countries.map((country: Country) => country.name);
  const sectorOptions = sectors.map((sector: Sector) => sector.name);
  // const titleOptions = titles.map((title) => ({
  //   label: title.identifier,
  //   value: title.id,
  // }));

  const titleOptions = [
    { label: t("register.title"), value: "" }, // this is important
    ...titles.map((title) => ({
      label: title.identifier,
      value: String(title.id),
    })),
  ];

  const registerLoading = useSelector(selectRegisterLoading);
  const registerSuccess = useSelector(selectRegisterSuccess);
  const registerError = useSelector(selectRegisterError);

  const loading = useSelector(selectEmailVerifyOtpLoading);
  const emailVerifyOtpToken = useSelector(selectEmailVerifyOtpToken);
  const expiresIn = useSelector(selectEmailVerifyOtpExpiresIn);
  const error = useSelector(selectEmailVerifyOtpError);
  const [showModal, setShowModal] = useState(false);

  const emailOtpLoading = useSelector(selectEmailOtpLoading);
  const emailOtpSuccess = useSelector(selectEmailOtpSuccess);
  const emailOtpError = useSelector(selectEmailOtpError);
  const emailOtpData = useSelector(selectEmailOtpData);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  const [emailValue, setEmailValue] = useState("");

  const handleTermsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("Terms & Conditions clicked!");
    setShowTermsModal(true);
    // Navigate or open modal as needed
  };

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log("Privacy Policy clicked!");
    setShowPrivacyModal(true);
    // Navigate or open modal as needed
  };

  const label = (
    <Trans
      i18nKey="register.acknowledge_text"
      components={{
        1: <a href="#" onClick={handleTermsClick} />,
        3: <a href="#" onClick={handlePrivacyClick} />,
      }}
    />
  );

  useEffect(() => {
    if (registerSuccess) {
      setIsLoading(false);
      onSubmitSuccess();
      reset();
    }
  }, [registerSuccess]);

  useEffect(() => {
    if (registerError) {
      setIsLoading(false);
      // Optionally show toast here: toast.error("Registration failed");
    }
  }, [registerError]);

  useEffect(() => {
    if (registerSuccess) {
      toast.success(t("register.success_message"));
      return;
    }

    if (registerError) {
      const { message, errors } = registerError;

      // Handle validation error with field-specific messages
      if (message === "Validation Error." && errors) {
        Object.values(errors).forEach((fieldErrors) => {
          if (Array.isArray(fieldErrors)) {
            fieldErrors.forEach((msg) => toast.error(msg));
          }
        });
      }

      // Show generic or fallback error message
      if (message && message !== "Validation Error.") {
        toast.error(message);
      }
    }
  }, [registerSuccess, registerError, t]);

  useEffect(() => {
    setIsLoading(loading);

    if (emailVerifyOtpToken) {
      setIsLoading(false);
      //setIsEmailVerified(true); // mark email as verified
      setShowModal(true);
      toast.success(t("register.otp_sent"));
    }

    if (error) {
      setIsLoading(false);
      setEmailOtpFailed(true);
      toast.error(t(error));
    }
  }, [loading, emailVerifyOtpToken, error, setIsLoading]);

  useEffect(() => {
    setIsLoading(emailOtpLoading);

    if (emailOtpSuccess) {
      setIsLoading(false);
      setShowModal(false);
      setIsEmailOtpVerified(true);
      toast.success(t("register.email_verified"));
    }

    if (emailOtpError) {
      setIsLoading(false);
      toast.error(t(emailOtpError));
    }
  }, [emailOtpLoading, emailVerifyOtpToken, emailOtpError, loading]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      firstName_prefix: "",
      lastName: "",
      nationalId: "",
      company_name: "",
      sector: "",
      country: "",
      mobileNumber: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const email = watch("email");

  const onSubmit = (data: any) => {
    if (step === 1) {
      if (!isEmailVerified) {
        alert(t("register.verify_email_alert"));
        return;
      }
      setDirection(1);
      setStep(2);
    } else if (step === 2) {
      const selectedCountry = countries.find(
        (c: Country) => c.name === data.country
      );
      const selectedSector = sectors.find(
        (s: Sector) => s.name === data.sector
      );

      const requestBody = {
        sector_id: selectedSector?.id || 0,
        title: data.firstName_prefix,
        country_id: selectedCountry?.id || 0,
        mobilecountrycode_id: 91,
        first_name: data.firstName,
        last_name: data.lastName,
        national_id: data.nationalId,
        company: data.company_name,
        mobile_number: data.mobileNumber,
        email: data.email,
        username: data.username,
        password: data.password,
      };

      console.log("reque", JSON.stringify(requestBody));

      setIsLoading(true);
      dispatch(registerRequest(requestBody));
    }
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(1);
  };

  const handleReset = () => {
    reset(); // Clears all form fields
    setIsChecked(false); // Unchecks the checkbox
  };

  const handleEmailVerify = () => {
    setIsEmailOtpVerified(false);
    setEmailOtpFailed(false);
    setIsLoading(true);
    setOtpRequestCount((prev) => prev + 1);
    dispatch(sendEmailVerifyOtpRequest(email));
  };

  const handleEmailOtpVerify = (otp: string) => {
    setIsLoading(false);
    setIsLoading(true);
    dispatch(
      verifyRegisterMailOtpRequest({
        token: emailVerifyOtpToken,
        otp: otp,
        purpose: "register",
      })
    );
  };
  return (
    <FormWrapper>
      <ProgressMenu currentStep={step} />
      <StyledForm onSubmit={handleSubmit(onSubmit)} noValidate>
        <AnimatePresence custom={direction} mode="wait">
          {step === 1 && (
            <>
              <Row>
                <Box>
                  <ReusableInput
                    label={t("register.first_name")}
                    name="firstName"
                    required={true}
                    placeholder={t("register.first_name_placeholder")}
                    prefixOptions={titleOptions}
                    register={register}
                    validationRules={{
                      required: t("register.validation.first_name_required"),
                    }}
                    error={errors.firstName}
                    prefixValidationRules={{
                      required: t("register.validation.title_required"),
                      validate: (v) =>
                        v !== "" || t("register.validation.title_required"),
                    }}
                    prefixError={errors?.firstName_prefix}
                  />
                </Box>
                <Box>
                  <ReusableInput
                    label={t("register.last_name")}
                    name="lastName"
                    required={true}
                    placeholder={t("register.last_name_placeholder")}
                    register={register}
                    validationRules={{
                      required: t("register.validation.last_name_required"),
                    }}
                    error={errors.lastName}
                  />
                </Box>
              </Row>

              <Row>
                <Box>
                  <ReusableInput
                    label={t("register.national_id")}
                    name="nationalId"
                    placeholder={t("register.national_id_placeholder")}
                    register={register}
                    error={errors.nationalId}
                    width="338px"
                  />
                </Box>
                <Box>
                  <ReusableInput
                    label={t("register.company_name")}
                    name="company_name"
                    required={true}
                    placeholder={t("register.company_name_placeholder")}
                    register={register}
                    validationRules={{
                      required: t("register.validation.company_name_required"),
                    }}
                    error={errors.company_name}
                  />
                </Box>
              </Row>

              <Row>
                <Box>
                  <ReusableSelect
                    label={t("register.sector")}
                    name="sector"
                    options={sectorOptions}
                    register={register}
                    required={true}
                    placeholder={t("register.sector_placeholder")}
                    validationRules={{
                      required: t("register.validation.sector_required"),
                    }}
                    error={errors.sector}
                  />
                </Box>
                <Box>
                  <ReusableEmailValidationInput
                    name="email"
                    control={control}
                    required={true}
                    placeholder={t("register.email_placeholder")}
                    label={t("register.email")}
                    validationRules={{
                      required: t("register.validation.email_required"),
                    }}
                    onVerifyChange={(verified) => setIsEmailVerified(verified)}
                    onVerifyClick={handleEmailVerify}
                    otpRequestCount={otpRequestCount}
                    onVerifyOtp={handleEmailOtpVerify}
                    otpVerified={isEmailOtpVerified}
                    otpError={emailOtpFailed}
                  />
                </Box>
              </Row>

              <Row>
                <Box>
                  <ReusableSelect
                    label={t("register.country")}
                    name="country"
                    required={true}
                    options={countryOptions}
                    register={register}
                    placeholder={t("register.country_placeholder")}
                    validationRules={{
                      required: t("register.validation.country_required"),
                    }}
                    error={errors.country}
                  />
                </Box>
                <Box>
                  <ReusableMobileValidationInput
                    label={t("register.mobile_number")}
                    name="mobileNumber"
                    required={true}
                    placeholder={t("register.mobile_number_placeholder")}
                    register={register}
                    setValue={setValue}
                    validationRules={{
                      required: t("register.validation.mobile_required"),
                    }}
                    error={errors.mobileNumber}
                    prefixOptions={["+91", "+61", "+04", "+966"]}
                    onVerifyChange={(verified) => {
                      console.log("Verified:", verified);
                      setIsMobileVerified(verified);
                    }}
                    isVerified={isMobileVerified}
                  />
                </Box>
              </Row>

              <SetpTwoButtonRow>
                <BackButton
                  text={t("register.cancel")}
                  showLogo={false}
                  onClick={() => navigate(-1)}
                />

                <Button text={t("register.next")} type="submit" />

                {/* <Button text="Next" onClick={handleBack} /> */}
              </SetpTwoButtonRow>
            </>
          )}

          {step === 2 && (
            <>
              <StepTwoContainer>
                <ReusableInput
                  label={t("register.username")}
                  name="username"
                  placeholder={t("register.username_placeholder")}
                  icon={userIcon}
                  required={true}
                  register={register}
                  validationRules={{
                    required: t("register.validation.username_required"),
                  }}
                  error={errors.username}
                />

                <ReusableInput
                  label={t("register.password")}
                  name="password"
                  placeholder={t("register.password_placeholder")}
                  icon={lockIcon}
                  required={true}
                  isPassword
                  register={register}
                  validationRules={{
                    required: t("register.validation.password_required"),
                    minLength: {
                      value: 8,
                      message: t("register.validation.password_min"),
                    },
                  }}
                  error={errors.password}
                />

                <ReusableInput
                  label={t("register.confirm_password")}
                  name="confirmPassword"
                  placeholder={t("register.confirm_password_placeholder")}
                  icon={lockIcon}
                  required={true}
                  isPassword
                  register={register}
                  validationRules={{
                    required: t(
                      "register.validation.confirm_password_required"
                    ),
                    validate: (value: string) =>
                      value === watch("password") ||
                      t("register.validation.passwords_match"),
                  }}
                  error={errors.confirmPassword}
                />

                <AcknowledgeCheckBox
                  checked={isChecked}
                  onChange={setIsChecked}
                  label={label}
                />

                <SetpTwoButtonRow>
                  <BackButton
                    text={t("register.back")}
                    showLogo={false}
                    onClick={handleBack}
                  />
                  <Button
                    text={t("register.register_button")}
                    disabled={registerLoading}
                  />
                </SetpTwoButtonRow>
              </StepTwoContainer>
            </>
          )}
        </AnimatePresence>
      </StyledForm>

      {showTermsModal && (
        <TermsModal
          fileUrl={termsPdf}
          title="Terms & Conditions"
          onClose={() => setShowTermsModal(false)}
        />
      )}

      {showPrivacyModal && (
        <TermsModal
          fileUrl={privacyPdf}
          title="Privacy Policy"
          onClose={() => setShowPrivacyModal(false)}
        />
      )}
    </FormWrapper>
  );
};
export default RegisterForm;
