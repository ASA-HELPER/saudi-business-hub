import { RootState } from "../rootReducer";

export const selectDeleteShareholderLoading = (state: RootState) =>
  state.shareholder.loading;

export const selectDeleteShareholderError = (state: RootState) =>
  state.shareholder.error;

export const selectDeletedShareholderIds = (state: RootState) =>
  state.shareholder.deletedIds;
