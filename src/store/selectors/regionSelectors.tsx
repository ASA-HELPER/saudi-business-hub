import { RootState } from "../rootReducer";

export const selectRegions = (state: RootState) => state.region.regions;
export const selectRegionsLoading = (state: RootState) => state.region.loading;
export const selectRegionsError = (state: RootState) => state.region.error;