export const SEND_OTP_REQUEST = "SEND_OTP_REQUEST";
export const SEND_OTP_SUCCESS = "SEND_OTP_SUCCESS";
export const SEND_OTP_FAILURE = "SEND_OTP_FAILURE";
export const RESET_SEND_OTP_FAILURE = "RESET_SEND_OTP_FAILURE";

export const sendEmailVerifyOtpRequest = (email: string) => ({
  type: SEND_OTP_REQUEST,
  payload: email,
});

export const sendOtpSuccess = (data: {
  token: string;
  expires_in: string;
}) => ({
  type: SEND_OTP_SUCCESS,
  payload: data,
});

export const sendOtpFailure = (error: string) => ({
  type: SEND_OTP_FAILURE,
  payload: error,
});

export const ResetSendOtpFailure = () => ({
  type: RESET_SEND_OTP_FAILURE,
});
