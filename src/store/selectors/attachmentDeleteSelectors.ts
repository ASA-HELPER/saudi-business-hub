import { RootState } from "../rootReducer";

export const selectDeleteAttachmentLoading = (state: RootState) =>
  state.deleteAttachment.loading;

export const selectDeleteAttachmentSuccess = (state: RootState) =>
  state.deleteAttachment.success;

export const selectDeleteAttachmentError = (state: RootState) =>
  state.deleteAttachment.error;
