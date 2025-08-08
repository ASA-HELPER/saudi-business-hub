import { createAction } from "@reduxjs/toolkit";
import { Shareholder } from "../types/shareHolderListTypes";

export const fetchShareholdersRequest = createAction(
  "FETCH_SHAREHOLDERS_REQUEST"
);
export const fetchShareholdersSuccess = createAction<Shareholder[]>(
  "FETCH_SHAREHOLDERS_SUCCESS"
);
export const fetchShareholdersFailure = createAction<string>(
  "FETCH_SHAREHOLDERS_FAILURE"
);
