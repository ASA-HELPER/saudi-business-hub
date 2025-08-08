import { createAction } from "@reduxjs/toolkit";
import { ShareholderIdType } from "../types/shareHolderIdTypes";

export const fetchShareholderIdTypesRequest = createAction(
  "FETCH_SHAREHOLDER_ID_TYPES_REQUEST"
);
export const fetchShareholderIdTypesSuccess = createAction<ShareholderIdType[]>(
  "FETCH_SHAREHOLDER_ID_TYPES_SUCCESS"
);
export const fetchShareholderIdTypesFailure = createAction<string>(
  "FETCH_SHAREHOLDER_ID_TYPES_FAILURE"
);
