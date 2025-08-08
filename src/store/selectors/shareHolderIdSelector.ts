import { RootState } from "../rootReducer";

export const selectShareholderIdTypes = (state: RootState) =>
  state.shareholderIdTypes.data;
export const selectShareholderIdTypesLoading = (state: RootState) =>
  state.shareholderIdTypes.loading;
export const selectShareholderIdTypesError = (state: RootState) =>
  state.shareholderIdTypes.error;
