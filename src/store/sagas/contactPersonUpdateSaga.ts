import { takeLatest, call, put } from "redux-saga/effects";
import {
  updateContactPersonSuccess,
  updateContactPersonFailure,
  updateContactPersonRequest,
} from "../actions/contactPersonActions";
import { updateContactPerson } from "../services/contactPersonService";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleUpdateContactPerson(
  action: PayloadAction<{ id: string | number; data: FormData }>
): Generator<any, void, any> {
  console.log("handleUpdateContactPerson", handleUpdateContactPerson);
  try {
    const { id, data } = action.payload;
    const response = yield call(updateContactPerson, id, data);
    yield put(updateContactPersonSuccess(response));
  } catch (error: any) {
    yield put(
      updateContactPersonFailure(error.message || "Something went wrong")
    );
  }
}

export default function* contactPersonUpdateSaga() {
  yield takeLatest(updateContactPersonRequest.type, handleUpdateContactPerson);
}
