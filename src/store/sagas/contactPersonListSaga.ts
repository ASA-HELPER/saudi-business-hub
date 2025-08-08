import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchContactPersonsListFailure,
  fetchContactPersonsListRequest,
  fetchContactPersonsListSuccess,
} from "../actions/contactPersonListActions";
import { fetchContactPersonsListApi } from "../services/contactPersonListService";
import { ContactPerson } from "../types/contactPersonListTypes";
import { ApiResponse } from "../types/ApiResponse";

function* handleFetchContactPersons() {
  try {
    const response: ApiResponse<ContactPerson[]> = yield call(
      fetchContactPersonsListApi
    );
    yield put(fetchContactPersonsListSuccess(response));
  } catch (error: any) {
    yield put(
      fetchContactPersonsListFailure(
        error.message || "Failed to fetch contact persons"
      )
    );
  }
}

export default function* contactPersonListSaga() {
  yield takeLatest(
    fetchContactPersonsListRequest.type,
    handleFetchContactPersons
  );
}
