import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchShareholderPersonsRequest,
  fetchShareholderPersonsSuccess,
  fetchShareholderPersonsFailure,
} from "../actions/shareholderPersonListActions";
import { fetchShareholderPersonsApi } from "../services/shareholderPersonListService";
import { ApiResponse } from "../types/ApiResponse";
import { ContactPerson } from "../types/contactPersonListTypes";

function* fetchShareholderPersonsSaga(
  action: ReturnType<typeof fetchShareholderPersonsRequest>
) {
  try {
    const response: ApiResponse<ContactPerson[]> = yield call(
      fetchShareholderPersonsApi,
      action.payload
    );
    yield put(fetchShareholderPersonsSuccess(response));
  } catch (error: any) {
    yield put(
      fetchShareholderPersonsFailure(error.message || "Something went wrong")
    );
  }
}

export function* watchShareholderPersonsSaga() {
  yield takeLatest(
    fetchShareholderPersonsRequest.type,
    fetchShareholderPersonsSaga
  );
}
