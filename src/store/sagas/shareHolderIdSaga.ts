import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchShareholderIdTypesRequest,
  fetchShareholderIdTypesSuccess,
  fetchShareholderIdTypesFailure,
} from "../actions/shareHolderIdActions";
import { fetchShareholderIdTypes } from "../services/shareHolderIdService";
import { ApiResponse } from "../types/ApiResponse";
import { ShareholderIdType } from "../types/shareHolderIdTypes";

function* handleFetchShareholderIdTypes(): Generator<any, void, any> {
  try {
    const data: ApiResponse<ShareholderIdType[]> = yield call(
      fetchShareholderIdTypes
    );
    yield put(fetchShareholderIdTypesSuccess(data?.data));
  } catch (error: any) {
    yield put(
      fetchShareholderIdTypesFailure(
        error.message || "Failed to fetch ID types."
      )
    );
  }
}

export default function* shareholderIdTypeSaga() {
  yield takeLatest(
    fetchShareholderIdTypesRequest.type,
    handleFetchShareholderIdTypes
  );
}
