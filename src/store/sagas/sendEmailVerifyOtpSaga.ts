import { call, put, takeLatest } from "redux-saga/effects";
import {
  SEND_OTP_REQUEST,
  sendOtpSuccess,
  sendOtpFailure,
} from "../actions/sendEmailVerifyOtpActions";
import { sendRegisterMailOtp } from "../services/authService";

function* sendEmailVerifyOtpSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(sendRegisterMailOtp, action.payload);
    if (response.success) {
      yield put(sendOtpSuccess(response.data));
    } else {
      yield put(sendOtpFailure("Failed to send OTP."));
    }
  } catch (error: any) {
    let message =
      error?.response?.data?.message ||
      error.message ||
      "Something went wrong.";

    // 🛠 If validation errors exist, extract the first message
    const errors = error?.response?.data?.errors;
    if (errors && typeof errors === "object") {
      const firstKey = Object.keys(errors)[0];
      if (firstKey && Array.isArray(errors[firstKey])) {
        message = errors[firstKey][0];
      }
    }

    yield put(sendOtpFailure(message));
  }
}

export default function* sendEmailVerifyOtpWatcher() {
  yield takeLatest(SEND_OTP_REQUEST, sendEmailVerifyOtpSaga);
}
