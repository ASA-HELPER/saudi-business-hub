import { call, put, takeLatest } from "redux-saga/effects";
import {
  deleteShareholderFailure,
  deleteShareholderSuccess,
} from "../actions/shareholderDeleteActions";
import { DELETE_SHAREHOLDER_REQUEST } from "../types/shareholder/shareholderDeleteTypes";
import { deleteShareholder } from "../services/shareholderDeleteService";
import { PayloadAction } from "@reduxjs/toolkit";

function* handleDeleteShareholder(action: PayloadAction<number>): any {
  try {
    const id = action.payload;
    yield call(deleteShareholder, id);
    yield put(deleteShareholderSuccess(id));
  } catch (error: any) {
    yield put(
      deleteShareholderFailure(error.message || "Failed to delete shareholder")
    );
  }
}

export default function* shareholderDeleteSaga() {
  yield takeLatest(DELETE_SHAREHOLDER_REQUEST, handleDeleteShareholder);
}
