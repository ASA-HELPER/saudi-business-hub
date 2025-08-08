import { RootState } from "../rootReducer";

export const selectRegisterData = (state: RootState) => state.register.data;
export const selectRegisterLoading = (state: RootState) =>
  state.register.loading;
export const selectRegisterError = (state: RootState) => state.register.error;
export const selectRegisterSuccess = (state: any) => state.register.success;
