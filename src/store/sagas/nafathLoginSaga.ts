import { call, put, takeLatest } from "redux-saga/effects";
import {
  NAFATH_LOGIN_REQUEST,
  nafthLoginSuccess,
  nafthLoginFailure,
} from "../actions/nafathLoginAction";
import { NafathLoginUser } from "../services/nafathLoginService";

function* handleNafathLogin(action: any): Generator<any, void, any> {
  try {    
    const response = yield call(NafathLoginUser, action.payload);
    if (response.success) {
        console.log(response.data);
        
      yield put(nafthLoginSuccess(response.data));
      // Optionally: yield call(() => localStorage.setItem('token', response.data.token));
    } else {      
      yield put(nafthLoginFailure("Login failed"));
    }
  } catch (error: any) {    
    yield put(nafthLoginFailure("error"));
  }
}

export default function* NafathLoginWatcher() {
  yield takeLatest(NAFATH_LOGIN_REQUEST, handleNafathLogin);
}
