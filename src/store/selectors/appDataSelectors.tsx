import { RootState } from "../rootReducer";
export const selectAppUpdates = (state: RootState) => state.appData.updates;
