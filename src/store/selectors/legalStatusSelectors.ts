import { RootState } from "../rootReducer";
import { LegalStatus } from "../types/legalStatus";

export const selectLegalStatusLoading = (state: RootState): boolean =>
  state.legalStatus.loading;

export const selectLegalStatusError = (state: RootState): string | null =>
  state.legalStatus.error;

export const selectLegalStatuses = (state: RootState): LegalStatus[] =>
  state.legalStatus.data;
