import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchRegistrationTypesSuccess,
  fetchRegistrationTypesFailure,
  FETCH_REGISTRATION_TYPES_REQUEST,
} from "../actions/registrationTypeActions";
import { getRegistrationTypes } from "../services/registrationTypeService";
import { RegistrationType } from "../types/registrationTypes";

function* fetchRegistrationTypesSaga() {
  try {
    const types: RegistrationType[] = yield call(getRegistrationTypes);
    yield put(fetchRegistrationTypesSuccess(types));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchRegistrationTypesFailure(error.message));
    } else {
      yield put(fetchRegistrationTypesFailure("An unknown error occurred"));
    }
  }
}

export function* watchRegistrationTypes() {
  yield takeLatest(
    FETCH_REGISTRATION_TYPES_REQUEST,
    fetchRegistrationTypesSaga
  );
}
