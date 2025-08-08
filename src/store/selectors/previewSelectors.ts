import { RootState } from "../rootReducer";

export const selectPreviewData = (state: RootState) => state.preview.data;
export const selectPreviewLoading = (state: RootState) => state.preview.loading;
export const selectPreviewError = (state: RootState) => state.preview.error;
