import { RootState } from "../rootReducer";

export const selectShareholderList = (state: RootState) =>
  state.shareholders.data;
export const selectShareholderLoading = (state: RootState) =>
  state.shareholders.loading;
export const selectShareholderError = (state: RootState) =>
  state.shareholders.error;
