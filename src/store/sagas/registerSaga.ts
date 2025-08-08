import { call, put, takeLatest } from "redux-saga/effects";
import {
  REGISTER_REQUEST,
  registerSuccess,
  registerFailure,
} from "../actions/registerActions";
import { registerUser } from "../services/registerService";
import { RegisterPayload, RegisterResponse } from "../types/registerTypes";

function* handleRegister(action: {
  type: string;
  payload: RegisterPayload;
}): Generator<any, void, RegisterResponse> {
  try {
    const response: RegisterResponse = yield call(registerUser, action.payload);

    if (response.success) {
      yield put(registerSuccess(response.data));
    } else {
      yield put(registerFailure("Registration failed."));
    }
  } catch (error: any) {
    yield put(registerFailure(error?.response?.data || "Something went wrong."));
  }
}

export default function* registerWatcher() {
  yield takeLatest(REGISTER_REQUEST, handleRegister);
}
