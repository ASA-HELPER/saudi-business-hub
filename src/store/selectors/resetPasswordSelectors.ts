import { RootState } from "../rootReducer";

export const selectResetPasswordLoading = (state: RootState) =>
  state.resetPassword.loading;
export const selectResetPasswordSuccess = (state: RootState) =>
  state.resetPassword.successMessage;
export const selectResetPasswordError = (state: RootState) =>
  state.resetPassword.error;
