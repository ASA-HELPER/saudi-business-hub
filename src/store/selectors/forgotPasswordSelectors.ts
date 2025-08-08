import { RootState } from "../rootReducer";

export const selectForgotPasswordLoading = (state: RootState) =>
  state.forgotPassword.loading;
export const selectForgotPasswordSuccess = (state: RootState) =>
  state.forgotPassword.successMessage;
export const selectForgotPasswordError = (state: RootState) =>
  state.forgotPassword.error;
