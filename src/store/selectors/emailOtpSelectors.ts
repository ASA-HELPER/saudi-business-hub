import { RootState } from "../rootReducer";

export const selectEmailOtpLoading = (state: RootState) =>
  state.emailOtp.loading;
export const selectEmailOtpSuccess = (state: RootState) =>
  state.emailOtp.success;
export const selectEmailOtpError = (state: RootState) => state.emailOtp.error;
export const selectEmailOtpData = (state: RootState) => state.emailOtp.data;
