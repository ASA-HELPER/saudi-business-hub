import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_OTP_REQUEST,
  LoginOtpSuccess,
  LoginOtpFailure,
} from "../actions/LoginOtpVerifyAction";
import { loginOtpUser } from "../services/loginOtpService";

function* handleOtpLogin(action: any): Generator<any, void, any> {
  try {
    const response = yield call(loginOtpUser, action.payload);
    console.log("handleOtpLogin", JSON.stringify(response));

    if (response.success) {
      yield put(LoginOtpSuccess(response.data));
      yield call(() => localStorage.setItem("token", response.data.token));
      yield call(() =>
        localStorage.setItem("userId", response.data?.customer?.id)
      );
      yield call(() =>
        localStorage.setItem("userName", response.data.username)
      );
      yield call(() => localStorage.setItem("email", response.data.email));
      yield call(() =>
        localStorage.setItem("mobile_number", response.data.username)
      );
    } else {
      yield put(LoginOtpFailure("Login failed"));
    }
  } catch (error: any) {
    yield put(LoginOtpFailure(error?.response?.data || "Unexpected error"));
  }
}

export default function* loginOtpWatcher() {
  yield takeLatest(LOGIN_OTP_REQUEST, handleOtpLogin);
}
