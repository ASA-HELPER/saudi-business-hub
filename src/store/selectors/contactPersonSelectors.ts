import { RootState } from "../rootReducer";

export const selectContactPersonLoading = (state: RootState) =>
  state.contactPerson.loading;

export const selectContactPersonError = (state: RootState) =>
  state.contactPerson.error;

export const selectContactPersonData = (state: RootState) =>
  state.contactPerson.data;
