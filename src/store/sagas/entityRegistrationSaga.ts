import { call, put, takeLatest } from "redux-saga/effects";
import {
  REGISTER_ENTITY_REQUEST,
  registerEntitySuccess,
  registerEntityFailure,
} from "../actions/entityRegistrationActions";
import { registerEntity } from "../services/entityRegistrationService";

function* handleRegisterEntity(action: any): Generator<any, void, any> {
  try {
    const response = yield call(registerEntity, action.payload);
    if (response.success) {
      yield put(registerEntitySuccess(response.data));
    } else {
      yield put(registerEntityFailure(response.message || "Unknown error"));
    }
  } catch (error: any) {
    yield put(registerEntityFailure(error.message || "Unexpected error"));
  }
}

export default function* entityRegistrationWatcher() {
  yield takeLatest(REGISTER_ENTITY_REQUEST, handleRegisterEntity);
}
