import { RootState } from '../rootReducer';
import { RegistrationType } from '../types/registrationTypes';

export const selectRegistrationTypes = (state: RootState): RegistrationType[] =>
  state.registrationTypes.types;

export const selectSelectedRegistrationType = (state: RootState): RegistrationType | null =>
  state.registrationTypes.selectedType;

export const selectRegistrationTypesLoading = (state: RootState): boolean =>
  state.registrationTypes.loading;

export const selectRegistrationTypesError = (state: RootState): string | null =>
  state.registrationTypes.error;