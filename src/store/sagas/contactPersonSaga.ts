import { takeLatest, call, put } from "redux-saga/effects";
import {
  createContactPersonRequest,
  createContactPersonSuccess,
  createContactPersonFailure,
} from "../actions/contactPersonActions";
import { createContactPerson } from "../services/contactPersonService";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleCreateContactPerson(
  action: PayloadAction<FormData>
): Generator<any, void, any> {
  try {
    const response = yield call(createContactPerson, action.payload);
    yield put(createContactPersonSuccess(response));
  } catch (error: any) {
    yield put(
      createContactPersonFailure(error.message || "Something went wrong")
    );
  }
}

export default function* contactPersonSaga() {
  yield takeLatest(createContactPersonRequest.type, handleCreateContactPerson);
}
