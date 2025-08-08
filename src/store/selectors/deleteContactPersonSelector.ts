import { RootState } from "../rootReducer";

export const selectDeleteContactPersonLoading = (state: RootState) =>
  state.deleteContactPerson.loading;

export const selectDeleteContactPersonSuccess = (state: RootState) =>
  state.deleteContactPerson.success;

export const selectDeleteContactPersonError = (state: RootState) =>
  state.deleteContactPerson.error;
