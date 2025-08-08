import { RootState } from "../rootReducer";

export const selectEmailVerifyOtpLoading = (state: RootState) =>
  state.sendEmailVerifyOtp.loading;
export const selectEmailVerifyOtpToken = (state: RootState) =>
  state.sendEmailVerifyOtp.otpToken;
export const selectEmailVerifyOtpExpiresIn = (state: RootState) =>
  state.sendEmailVerifyOtp.expiresIn;
export const selectEmailVerifyOtpError = (state: RootState) =>
  state.sendEmailVerifyOtp.error;
