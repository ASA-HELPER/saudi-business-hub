import { createAction } from "@reduxjs/toolkit";
import { ShareholderPersonPayload } from "../types/shareHolderPersonTypes";

export const createShareholderRequest = createAction<ShareholderPersonPayload>(
  "CREATE_SHAREHOLDER_REQUEST"
);
export const createShareholderSuccess = createAction<any>(
  "CREATE_SHAREHOLDER_SUCCESS"
);
export const createShareholderFailure = createAction<string>(
  "CREATE_SHAREHOLDER_FAILURE"
);

export const updateShareholderRequest = createAction<ShareholderPersonPayload>(
  "UPDATE_SHAREHOLDER_REQUEST"
);
