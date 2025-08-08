import { RootState } from "../rootReducer";

export const selectStructure = (state: RootState) => state.structure.data;
export const selectStructureLoading = (state: RootState) =>
  state.structure.loading;
export const selectStructureError = (state: RootState) => state.structure.error;

export const selectSections = (state: RootState) =>
  state.structure.data?.sections || [];
export const selectDivisions = (state: RootState) =>
  state.structure.data?.divisions || [];
export const selectGroups = (state: RootState) =>
  state.structure.data?.groups || [];
export const selectClasses = (state: RootState) =>
  state.structure.data?.classes || [];
export const selectBranches = (state: RootState) =>
  state.structure.data?.branches || [];
export const selectActivities = (state: RootState) =>
  state.structure.data?.activities || [];
