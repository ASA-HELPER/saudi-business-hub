import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchStructureRequest,
  fetchStructureSuccess,
  fetchStructureFailure,
} from "../actions/businessRegActions";
import { fetchStructure } from "../services/registrationStructureService";
import { StructureResponse } from "../types/businessStructure";
import { PayloadAction } from "@reduxjs/toolkit";

interface ApiResponse {
  success: boolean;
  message: string;
  data: StructureResponse;
}
function* handleFetchStructure(action: PayloadAction<number>) {
  try {
    const registrationTypeId = action.payload;
    const data: ApiResponse = yield call(fetchStructure, registrationTypeId);
    yield put(fetchStructureSuccess(data.data));
  } catch (error: any) {
    yield put(
      fetchStructureFailure(error.message || "Failed to fetch structure")
    );
  }
}

export function* watchFetchStructure() {
  yield takeLatest(fetchStructureRequest.type, handleFetchStructure);
}
