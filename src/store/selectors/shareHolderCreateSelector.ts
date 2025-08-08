import { RootState } from "../rootReducer";

export const selectCreateShareholderLoading = (state: RootState) =>
  state.createShareholder.loading;
export const selectCreateShareholderError = (state: RootState) =>
  state.createShareholder.error;
export const selectCreateShareholderSuccess = (state: RootState) =>
  state.createShareholder.success;
