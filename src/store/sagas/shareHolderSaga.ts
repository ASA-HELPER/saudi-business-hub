import { call, put, takeLatest } from "redux-saga/effects";
import { fetchShareholders } from "../services/shareHolderListService";
import {
  fetchShareholdersRequest,
  fetchShareholdersSuccess,
  fetchShareholdersFailure,
} from "../actions/shareHolderListAction";
import { ApiResponse } from "../types/ApiResponse";
import { Shareholder } from "../types/shareHolderListTypes";

function* handleFetchShareholders(): Generator<any, void, any> {
  try {
    const data: ApiResponse<Shareholder[]> = yield call(fetchShareholders);
    yield put(fetchShareholdersSuccess(data.data));
  } catch (error: any) {
    yield put(
      fetchShareholdersFailure(error.message || "Failed to fetch shareholders.")
    );
  }
}

export default function* shareholderSaga() {
  yield takeLatest(fetchShareholdersRequest.type, handleFetchShareholders);
}
