import {
  DELETE_SHAREHOLDER_REQUEST,
  DELETE_SHAREHOLDER_SUCCESS,
  DELETE_SHAREHOLDER_FAILURE,
  ShareholderActionTypes,
} from "../types/shareholder/shareholderDeleteTypes";

export const deleteShareholderRequest = (id: number) => ({
  type: DELETE_SHAREHOLDER_REQUEST,
  payload: id,
});

export const deleteShareholderSuccess = (id: number) => ({
  type: DELETE_SHAREHOLDER_SUCCESS,
  payload: id,
});

export const deleteShareholderFailure = (error: string) => ({
  type: DELETE_SHAREHOLDER_FAILURE,
  payload: error,
});
