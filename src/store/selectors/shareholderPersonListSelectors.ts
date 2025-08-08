import { RootState } from "../rootReducer";

export const selectShareholderPersons = (state: RootState) =>
  state.shareholderPersons.data;

export const selectShareholderPersonsLoading = (state: RootState) =>
  state.shareholderPersons.loading;

export const selectShareholderPersonsError = (state: RootState) =>
  state.shareholderPersons.error;
