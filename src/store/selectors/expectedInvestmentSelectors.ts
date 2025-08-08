import { RootState } from "../rootReducer";

export const selectExpectedInvestmentList = (state: RootState) =>
  state.expectedInvestments.data;

export const selectExpectedInvestmentLoading = (state: RootState) =>
  state.expectedInvestments.loading;

export const selectExpectedInvestmentError = (state: RootState) =>
  state.expectedInvestments.error;
