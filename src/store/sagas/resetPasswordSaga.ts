import { call, put, takeLatest } from "redux-saga/effects";
import {
  RESET_PASSWORD_REQUEST,
  resetPasswordSuccess,
  resetPasswordFailure,
} from "../actions/resetPasswordActions";
import { resetPassword } from "../services/resetPasswordService";

function* resetPasswordSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(resetPassword, action.payload);
    if (response.success) {
      yield put(resetPasswordSuccess(response.message));
    } else {
      yield put(resetPasswordFailure("Failed to reset password"));
    }
  } catch (error: any) {
    yield put(resetPasswordFailure(error.message));
  }
}

export default function* resetPasswordWatcher() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordSaga);
}
