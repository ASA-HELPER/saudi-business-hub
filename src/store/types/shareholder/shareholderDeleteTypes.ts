export const DELETE_SHAREHOLDER_REQUEST = "DELETE_SHAREHOLDER_REQUEST";
export const DELETE_SHAREHOLDER_SUCCESS = "DELETE_SHAREHOLDER_SUCCESS";
export const DELETE_SHAREHOLDER_FAILURE = "DELETE_SHAREHOLDER_FAILURE";

export interface DeleteShareholderRequestAction {
  type: typeof DELETE_SHAREHOLDER_REQUEST;
  payload: number; // shareholder ID
}

export interface DeleteShareholderSuccessAction {
  type: typeof DELETE_SHAREHOLDER_SUCCESS;
  payload: number;
}

export interface DeleteShareholderFailureAction {
  type: typeof DELETE_SHAREHOLDER_FAILURE;
  payload: string;
}

export type ShareholderActionTypes =
  | DeleteShareholderRequestAction
  | DeleteShareholderSuccessAction
  | DeleteShareholderFailureAction;
