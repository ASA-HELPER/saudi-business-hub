import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchLegalStatusRequest,
  fetchLegalStatusSuccess,
  fetchLegalStatusFailure,
} from "../actions/legalStatusActions";
import { fetchLegalStatuses } from "../services/legalStatusService";
import { LegalStatus } from "../types/legalStatus";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleFetchLegalStatuses(action: PayloadAction<number>) {
  try {
    const registrationTypeId = action.payload;
    const legalStatuses: LegalStatus[] = yield call(
      fetchLegalStatuses,
      registrationTypeId
    );
    yield put(fetchLegalStatusSuccess(legalStatuses));
  } catch (error: any) {
    yield put(
      fetchLegalStatusFailure(
        error?.message || "Failed to fetch legal statuses"
      )
    );
  }
}

export function* watchFetchLegalStatuses() {
  yield takeLatest(fetchLegalStatusRequest.type, handleFetchLegalStatuses);
}
