export const LOGIN_OTP_REQUEST = "LOGIN_OTP_REQUEST";
export const LOGIN_OTP_SUCCESS = "LOGIN_OTP_SUCCESS";
export const LOGIN_OTP_FAILURE = "LOGIN_OTP_FAILURE";

export const LoginOtpRequest = (payload: {
  token: string;
  otp: string;
  purpose: string;
}) => ({
  type: LOGIN_OTP_REQUEST,
  payload,
});

export const LoginOtpSuccess = (data: any) => ({
  type: LOGIN_OTP_SUCCESS,
  payload: data,
});

export const LoginOtpFailure = (error: string) => ({
  type: LOGIN_OTP_FAILURE,
  payload: error,
});
