import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import ReusableInput from "../../generic/Input/ResuableInput";
import Button from "../../generic/Button/Button";
import BackButton from "../../generic/Button/BackButton";
import Footer from "../LoginSection/Footer";
import LoginExtras from "./LoginExtras";
import InvestorLoginButton from "../../generic/Button/LoginButton/LoginButton";
import { useDispatch, useSelector } from "react-redux";
import { nafthLoginRequest } from "../../../store/actions/nafathLoginAction";
import {
  selectNafathLoginError,
  selectNafathLoginUser,
} from "../../../store/selectors/nafathLoginSelector";
import googleicon from "../../../assets/images/googleplay.svg";
import playstore from "../../../assets/images/appstore-1.svg";
import appstore from "../../../assets/images/appstore.svg";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useLoading } from "../../generic/Loader/LoadingContext";
import userIcon from "../../../assets/images/user.png";
import Modal from "../../generic/Modal/Modal";
import { useTranslation } from "react-i18next";

const NafathLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const [socket, setSocket] = useState<Socket | null>(null);
  const [socketResponse, setSocketResponse] = useState<any>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setIsLoading } = useLoading();
  const user = useSelector(selectNafathLoginUser);
  const nafathLoginError = useSelector(selectNafathLoginError);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [nafathUsers, setNafathUsers] = useState<any[]>([]);
  const [selectedUserToken, setSelectedUserToken] = useState<string | null>(
    null
  );
  const [showUserSelectModal, setShowUserSelectModal] = useState(false);
  const { t } = useTranslation();


  // Fetch reCAPTCHA token on mount
  useEffect(() => {
    const getRecaptcha = async () => {
      if (executeRecaptcha) {
        const token = await executeRecaptcha("nafath_login");
        setRecaptchaToken(token);
      }
    };
    getRecaptcha();
  }, [executeRecaptcha]);

  // Handle API error
  useEffect(() => {
    console.log(nafathLoginError);

    setIsLoading(false);
    if (nafathLoginError) {
      toast.error(t("nafath_login.toast_login_failed", { error: nafathLoginError })); // Replace with toast if preferred
    }
  }, [nafathLoginError]);

  useEffect(() => {
    setIsLoading(false);

    if (user?.random) {
      setShowModal(true);

      const socketInstance = io("https://eservices.deenzprojects.com", {
        transports: ["websocket"],
        timeout: 120_000,
      });

      setSocket(socketInstance);

      socketInstance.on("connect", () => {
        console.log("Socket.IO connected");

        // Emit event to join the Nafath room / session
        socketInstance.emit("join", { random: user.random }); // backend must listen for this
      });

      socketInstance.onAny((event, data) => {
        console.log("Received event:", event);
        console.log("Received Data:", data);
        console.log("Received Data Json Stringify:", JSON.stringify(data));
        console.log("Received Data Status:", data?.status);
        console.log("Received Data PersonId:", data?.person?.Id);
      });

      socketInstance.on(
        "invest_saudi_database_callback-channel",
        async (data: any) => {
          console.log("status received:", JSON.stringify(data));
          console.log("Data Status:", data?.status);
          console.log("Data PersonId:", data?.person?.Id);
          setSocketResponse(data);

          const status = data?.data?.status || data?.status;

          if (status === "COMPLETED" && data?.person?.Id) {
            try {
              const personId =  data?.person?.Id || data?.data?.person?.Id;

              const response = await fetch(
                `https://eservices.deenzprojects.com/auth/nafath/users/by-nid/${personId}`
              );
              const json = await response.json();

              if (json.success && Array.isArray(json.data)) {
                setNafathUsers(json.data);

                // Close Nafath modal and open user selection modal
                setShowModal(false);
                setShowUserSelectModal(true);
              } else {
                toast.error(t("nafath_login.toast_fetch_users_failed"));
              }
            } catch (err) {
              console.error(err);
              toast.error(t("nafath_login.toast_fetch_users_error"));
            }
          }

          // if (status === "APPROVED") {
          //   toast.success("Login approved!");
          //   setShowModal(false);
          //   navigate("/dashboard");
          // }

          if (status === "REJECTED") {
            toast.error(t("nafath_login.toast_login_rejected"));
            setShowModal(false);
          }

          if (status === "EXPIRED") {
            toast.warn(t("nafath_login.toast_login_expired"));
            setShowModal(false);
          }
        }
      );

      // socketInstance.on("nafath_status", (data: any) => {
      //   console.log("status received:", data);

      //   // Store the full response to show in popup
      //   setSocketResponse(data);

      //   if (data.status === "APPROVED") {
      //     toast.success("Login approved!");
      //     setShowModal(false);
      //     navigate("/dashboard");
      //   }

      //   if (data.status === "REJECTED") {
      //     toast.error("Login rejected");
      //     setShowModal(false);
      //   }

      //   if (data.status === "EXPIRED") {
      //     toast.warn("⏳ Request expired");
      //     setShowModal(false);
      //   }
      // });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [user]);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    if (recaptchaToken) {
      dispatch(
        nafthLoginRequest({
          nafathID: data.nafthID,
        })
      );
    }
  };

  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <CenteredField>
          <LoginExtras />
        </CenteredField>

        <ReusableInput
          label={t("nafath_login.nafath_id_label")}
          name="nafthID"
          placeholder={t("nafath_login.nafath_id_placeholder")}
          icon={userIcon}
          register={register}
          validationRules={{
            required: t("nafath_login.nafath_id_required"),
            pattern: {
              value: /^\d{10}$/,
              message: t("nafath_login.nafath_id_invalid")
            },
          }}
          error={errors["nafthID"]}
        />

        <Button text={t("nafath_login.login_button")} disabled={!recaptchaToken} />

        {/* Divider */}
        <OrDivider>{t("nafath_login.or")}</OrDivider>

        <InvestorLoginButton
          text={t("nafath_login.investor_login")}
          showLogo={false}
          onClick={() => navigate("/login")}
        />

        {/* <CenteredField>
          <BackButton
            text={t("nafath_login.back")}
            color="#0c3957"
            onClick={() => navigate(-1)}
          />
        </CenteredField> */}
        <CenteredField>
          <Footer linkName={t("nafath_login.register")} linkPath="/register" />
        </CenteredField>
      </StyledForm>

      <Modal
        show={showUserSelectModal}
        onClose={() => setShowUserSelectModal(false)}
        title={t("nafath_login.modal_user_select_title")}
        description={
          <ModalContent>
            <InstructionText>
              {t("nafath_login.modal_user_select_instruction")}
            </InstructionText>
            <UserRadioList>
              {nafathUsers.map((item) => {
                const user = item.user || {};
                const customer = item.customer || {};
                const displayName = customer?.first_name
                  ? `${customer.first_name} ${customer.last_name || ""}`
                  : user.username;

                return (
                  <RadioItem key={user.id}>
                    <label>
                      <input
                        type="radio"
                        name="selectedUser"
                        value={user.token}
                        onChange={() => {
                          setSelectedUserToken(user.token);
                          localStorage.setItem("token", user?.token);
                          localStorage.setItem("userId", user?.customer?.id);
                          localStorage.setItem("userName", user?.username);
                          localStorage.setItem("email", user?.email);
                          localStorage.setItem(
                            "mobile_number",
                            user?.mobile_number
                          );
                          toast.success(t("nafath_login.toast_logged_in_as", { name: displayName }));
                          setShowUserSelectModal(false);
                          navigate("/dashboard");
                        }}
                      />
                      <UserDetails>
                        <strong>{displayName}</strong>
                        <small>{user.email}</small>
                      </UserDetails>
                    </label>
                  </RadioItem>
                );
              })}
            </UserRadioList>
          </ModalContent>
        }
      />

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title={t("nafath_login.modal_verify_title")}
        description={
          <ModalContent>
            <InstructionText>
             {t("nafath_login.modal_verify_instruction")}
            </InstructionText>

            <NumberWrapper>
              <VerificationNumber>{user?.random}</VerificationNumber>
            </NumberWrapper>

            <DownloadText>{t("nafath_login.download_app")}</DownloadText>

            <AppButtonsContainer>
              <AppButton href="#">
                <AppIcon src={googleicon} alt="Google Play" />
              </AppButton>
              <AppButton href="#">
                <AppIcon 
                  src={appstore} 
                  alt="App Store" 
                  style={{ width: "135px", height: "40px", objectFit: "contain" }} 
                />
              </AppButton>
              <AppButton href="#">
                <AppIcon src={playstore} alt="AppGallery" />
              </AppButton>
            </AppButtonsContainer>

            {socketResponse && (
              <ResponseBox>
                <code>{JSON.stringify(socketResponse, null, 2)}</code>
              </ResponseBox>
            )}
          </ModalContent>
        }
      />
    </FormWrapper>
  );
};

export default NafathLoginForm;

// Styled Components
const ModalContent = styled.div`
  text-align: center;
  padding: 0 20px;
`;

const InstructionText = styled.p`
  margin-bottom: 24px;
  font-size: 16px;
  color: #333;
  line-height: 1.5;
`;

const NumberWrapper = styled.div`
  margin: 20px 0;
`;

const VerificationNumber = styled.div`
  font-size: 46px;
  font-weight: bold;
  color: #00778e;
  display: inline-block;
  padding: 12px 24px;
`;

const DownloadText = styled.p`
  margin: 24px 0 16px;
  font-size: 16px;
  color: #333;
  position: relative; /* Added to prevent layout shift */
  top: 0;
`;

const AppButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  position: relative; /* Added to prevent layout shift */
  top: 0;
`;

const AppButton = styled.a`
  display: block;
`;

const AppIcon = styled.img`
  height: 40px;
`;

const ResponseBox = styled.pre`
  text-align: left;
  margin-top: 20px;
  background: #f0f0f0;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
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

const Title = styled.h1`
  margin-bottom: 28px;
  font-family: "IBM Plex Sans Arabic", sans-serif;
  font-weight: 600;
  font-size: clamp(16px, 1.8vw, 28px);
  color: #0c3957;
  text-align: center;
  width: 100%;
`;

const CenteredField = styled.div`
  margin-top:50px;
`;

const OrDivider = styled.div`
  display: flex;
  width: clamp(280px, 30vw, 538px);
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

const UserRadioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  text-align: left;
`;

const RadioItem = styled.div`
  background: #f9f9f9;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;

  input {
    margin-right: 10px;
  }
`;

const UserDetails = styled.div`
  display: inline-block;

  strong {
    display: block;
    font-size: 16px;
    color: #0c3957;
  }

  small {
    color: #666;
    font-size: 13px;
  }
`;
