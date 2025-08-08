import { RootState } from "../rootReducer";

export const selectEntityList = (state: RootState) => state.getEntityList.data;
export const selectEntityListLoading = (state: RootState) =>
  state.getEntityList.loading;
export const selectEntityListError = (state: RootState) =>
  state.getEntityList.error;
