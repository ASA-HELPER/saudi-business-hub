// actions/previewActions.ts

import {
  GET_PREVIEW_REQUEST,
  GET_PREVIEW_SUCCESS,
  GET_PREVIEW_FAILURE,
  PreviewApiResponse,
} from "../types/previewTypes";

export const getPreviewRequest = () => ({
  type: GET_PREVIEW_REQUEST,
});

export const getPreviewSuccess = (data: PreviewApiResponse["data"]) => ({
  type: GET_PREVIEW_SUCCESS,
  payload: data,
});

export const getPreviewFailure = (error: any) => ({
  type: GET_PREVIEW_FAILURE,
  payload: error,
});
