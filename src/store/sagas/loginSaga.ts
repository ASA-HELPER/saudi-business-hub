import { call, put, takeLatest } from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure,
} from "../actions/loginActions";
import { loginUser } from "../services/loginService";

function* handleLogin(action: any): Generator<any, void, any> {
  try {
    const response = yield call(loginUser, action.payload);
          console.log(response);

    if (response.success) {
      yield put(loginSuccess(response.data));
      // Optionally: yield call(() => localStorage.setItem('token', response.data.token));
    } else {      
      yield put(loginFailure("Login failed"));
    }
  } catch (error: any) {
    yield put(loginFailure(error?.response?.data || "Unexpected error"));
  }
}

export default function* loginWatcher() {
  yield takeLatest(LOGIN_REQUEST, handleLogin);
}
