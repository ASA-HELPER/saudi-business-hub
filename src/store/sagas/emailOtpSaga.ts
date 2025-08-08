import { call, put, takeLatest } from "redux-saga/effects";
import { verifyRegisterMailOtp } from "../services/authService";
import {
  verifyRegisterMailOtpFailure,
  verifyRegisterMailOtpSuccess,
} from "../actions/emailOtpActions";
import { VERIFY_REGISTER_MAIL_OTP_REQUEST } from "../types/emailOtpTypes";

function* verifyRegisterMailOtpSaga(action: any): Generator<any, void, any> {
  console.log(action?.payload);

  try {
    const response = yield call(verifyRegisterMailOtp, action.payload);
    console.log("verifyRegisterMailOtpSaga", JSON.stringify(response));

    if (response.success) {
      yield put(verifyRegisterMailOtpSuccess(response.data));
    } else {
      yield put(
        verifyRegisterMailOtpFailure(
          response.message || "Failed to verify OTP."
        )
      );
    }
  } catch (error: any) {
    console.log("Axios error response", error?.response?.data);

    // Axios 400 error has structure: error.response.data
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.errors?.message?.[0] ||
      error.message ||
      "Something went wrong during OTP verification.";

    console.log("final message", message);
    yield put(verifyRegisterMailOtpFailure(message));
  }
}

export default function* verifyRegisterMailOtpWatcher() {
  yield takeLatest(VERIFY_REGISTER_MAIL_OTP_REQUEST, verifyRegisterMailOtpSaga);
}
