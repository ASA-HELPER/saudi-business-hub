import { call, put, takeLatest } from "redux-saga/effects";
import {
  FORGOT_PASSWORD_REQUEST,
  forgotPasswordSuccess,
  forgotPasswordFailure,
} from "../actions/forgotPasswordActions";
import { forgotPassword } from "../services/forgotPasswordService";

function* forgotPasswordSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(forgotPassword, action.payload);
    if (response.success) {
      yield put(forgotPasswordSuccess(response.message));
    } else {
      yield put(forgotPasswordFailure("Failed to send reset link"));
    }
  } catch (error: any) {
    yield put(forgotPasswordFailure(error?.response?.data));
  }
}

export default function* forgotPasswordWatcher() {
  yield takeLatest(FORGOT_PASSWORD_REQUEST, forgotPasswordSaga);
}
