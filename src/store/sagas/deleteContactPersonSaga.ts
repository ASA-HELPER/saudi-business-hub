import { call, put, takeLatest } from "redux-saga/effects";
import {
  DELETE_CONTACT_PERSON_REQUEST,
  deleteContactPersonSuccess,
  deleteContactPersonFailure,
} from "../actions/deleteContactAction";
import { deleteContactPerson } from "../services/deleteContactPersonService";

function* handleDeleteContactPerson(action: any): any {
  try {
    const response = yield call(deleteContactPerson, action.payload);
    if (response.success) {
      yield put(deleteContactPersonSuccess(response.message));
    } else {
      yield put(
        deleteContactPersonFailure(response.message || "Delete failed")
      );
    }
  } catch (error: any) {
    yield put(deleteContactPersonFailure(error.message));
  }
}

export default function* deleteContactPersonSaga() {
  yield takeLatest(DELETE_CONTACT_PERSON_REQUEST, handleDeleteContactPerson);
}
