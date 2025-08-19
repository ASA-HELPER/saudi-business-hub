import {
  GET_SHAREHOLDER_BY_ID_REQUEST,
  GET_SHAREHOLDER_BY_ID_SUCCESS,
  GET_SHAREHOLDER_BY_ID_FAILURE,
  ShareholderByIdActionTypes,
  ShareholderInfoByIdResponse,
} from "../types/shareholder/shareholderGetByIdTypes";

export const getShareholderByIdRequest = (
  id: number
): ShareholderByIdActionTypes => ({
  type: GET_SHAREHOLDER_BY_ID_REQUEST,
  payload: id,
});

export const getShareholderByIdSuccess = (
  data: ShareholderInfoByIdResponse
): ShareholderByIdActionTypes => ({
  type: GET_SHAREHOLDER_BY_ID_SUCCESS,
  payload: data,
});

export const getShareholderByIdFailure = (
  error: string
): ShareholderByIdActionTypes => ({
  type: GET_SHAREHOLDER_BY_ID_FAILURE,
  payload: error,
});
