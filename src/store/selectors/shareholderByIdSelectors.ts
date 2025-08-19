import { RootState } from "../rootReducer";
import { ShareholderInfoByIdResponse } from "../types/shareholder/shareholderGetByIdTypes";

export const selectShareholderByIdState = (state: RootState) =>
  state.shareholderById;
export const selectShareholderByIdLoading = (state: RootState) =>
  state.shareholderById.loading;
export const selectShareholderByIdError = (state: RootState) =>
  state.shareholderById.error;

export const selectShareholderByIdData = (state: RootState) =>
  state.shareholderById.data?.data ?? null;
