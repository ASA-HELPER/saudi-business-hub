import { createAction } from "@reduxjs/toolkit";
import { LegalStatus } from "../types/legalStatus";

export const fetchLegalStatusRequest = createAction<number>(
  "FETCH_LEGAL_STATUS_REQUEST"
);

export const fetchLegalStatusSuccess = createAction<LegalStatus[]>(
  "FETCH_LEGAL_STATUS_SUCCESS"
);
export const fetchLegalStatusFailure = createAction<string>(
  "FETCH_LEGAL_STATUS_FAILURE"
);
