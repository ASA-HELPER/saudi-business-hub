import { RootState } from "../rootReducer";

export const selectContactPersons = (state: RootState) =>
  state.contactPersons.data;
export const selectContactPersonsLoading = (state: RootState) =>
  state.contactPersons.loading;
export const selectContactPersonsError = (state: RootState) =>
  state.contactPersons.error;
