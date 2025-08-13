import { call, put, takeLatest } from "redux-saga/effects";
import {
  getShareholderByIdSuccess,
  getShareholderByIdFailure,
} from "../actions/shareholderGetByIdActions";
import {
  GET_SHAREHOLDER_BY_ID_REQUEST,
  GetShareholderByIdRequestAction,
} from "../types/shareholder/shareholderGetByIdTypes";
import { getShareholderByIdApi } from "../services/shareholderByIdServices";

function* handleGetShareholderById(
  action: GetShareholderByIdRequestAction
): any {
  try {
    const res = yield call(getShareholderByIdApi, action.payload);
    if (res.success) {
      yield put(getShareholderByIdSuccess(res));
    } else {
      yield put(
        getShareholderByIdFailure(
          res.message || "Failed to fetch shareholder info"
        )
      );
    }
  } catch (error: any) {
    yield put(
      getShareholderByIdFailure(error.message || "Something went wrong")
    );
  }
}

export function* watchGetShareholderById() {
  yield takeLatest(GET_SHAREHOLDER_BY_ID_REQUEST, handleGetShareholderById);
}
