// sagas/previewSaga.ts

import { call, put, takeLatest } from "redux-saga/effects";
import { GET_PREVIEW_REQUEST } from "../types/previewTypes";
import {
  getPreviewSuccess,
  getPreviewFailure,
} from "../actions/previewActions";
import { fetchPreviewData } from "../services/previewService";

function* handleGetPreview(): Generator<any, void, any> {
  try {
    const response = yield call(fetchPreviewData);
    yield put(getPreviewSuccess(response));
  } catch (error: any) {
    yield put(getPreviewFailure(error.message));
  }
}

export function* previewSaga() {
  yield takeLatest(GET_PREVIEW_REQUEST, handleGetPreview);
}
