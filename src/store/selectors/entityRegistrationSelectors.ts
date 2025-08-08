import { RootState } from "../rootReducer";

export const selectEntityRegistrationData = (state: RootState) =>
  state.entityRegistration.data;

export const selectEntityRegistrationLoading = (state: RootState) =>
  state.entityRegistration.loading;

export const selectEntityRegistrationError = (state: RootState) =>
  state.entityRegistration.error;
