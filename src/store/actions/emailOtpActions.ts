import {
  VERIFY_REGISTER_MAIL_OTP_REQUEST,
  VERIFY_REGISTER_MAIL_OTP_SUCCESS,
  VERIFY_REGISTER_MAIL_OTP_FAILURE,
  RESET_VERIFY_MAIL_OTP_STATE,
} from "../types/emailOtpTypes";

export const verifyRegisterMailOtpRequest = (payload: {
  token: string;
  otp: string;
  purpose: string;
}) => ({
  type: VERIFY_REGISTER_MAIL_OTP_REQUEST,
  payload,
});

export const verifyRegisterMailOtpSuccess = (data: any) => ({
  type: VERIFY_REGISTER_MAIL_OTP_SUCCESS,
  payload: data,
});

export const verifyRegisterMailOtpFailure = (error: any) => ({
  type: VERIFY_REGISTER_MAIL_OTP_FAILURE,
  payload: error,
});

export const resetRegisterMailOtpState = () => ({
  type: RESET_VERIFY_MAIL_OTP_STATE,
});
