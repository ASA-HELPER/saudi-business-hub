import { call, put, takeLatest } from "redux-saga/effects";
import {
  createShareholderRequest,
  createShareholderSuccess,
  createShareholderFailure,
} from "../actions/shareHolderCreateAction";
import { createShareholder } from "../services/shareHolderCreateService";

function* handleCreateShareholder(
  action: ReturnType<typeof createShareholderRequest>
): Generator<any, void, any> {
  try {
    const response = yield call(createShareholder, action.payload);
    yield put(createShareholderSuccess(response));
  } catch (error: any) {
    yield put(
      createShareholderFailure(error.message || "Failed to create shareholder")
    );
  }
}

export default function* createShareholderSaga() {
  yield takeLatest(createShareholderRequest.type, handleCreateShareholder);
}
