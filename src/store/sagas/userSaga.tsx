import { call, put, takeLatest } from "redux-saga/effects";
import { loginUser } from "../services/userService";
import { SET_USER } from "../types/userTypes";
function* handleLogin(action: any): Generator<any, void, any> {
  try {
    const response = yield call(loginUser, action.payload);
    yield put({ type: SET_USER, payload: response.data });
  } catch (e) {
    console.error(e);
  }
}
export function* watchUserSaga() {
  //yield takeLatest("LOGIN_REQUEST", handleLogin);
}
