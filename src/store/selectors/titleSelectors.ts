import { RootState } from "../rootReducer";

export const selectTitleList = (state: RootState) => state.titles.titles;
export const selectTitleLoading = (state: RootState) => state.titles.loading;
export const selectTitleError = (state: RootState) => state.titles.error;
