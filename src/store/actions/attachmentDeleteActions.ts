import {
  DELETE_ATTACHMENT_REQUEST,
  DELETE_ATTACHMENT_SUCCESS,
  DELETE_ATTACHMENT_FAILURE,
} from "../types/deleteAttachmentTypes";

export const deleteAttachmentRequest = (mediaId: number) => ({
  type: DELETE_ATTACHMENT_REQUEST,
  payload: mediaId,
});

export const deleteAttachmentSuccess = (message: string) => ({
  type: DELETE_ATTACHMENT_SUCCESS,
  payload: message,
});

export const deleteAttachmentFailure = (error: string) => ({
  type: DELETE_ATTACHMENT_FAILURE,
  payload: error,
});
