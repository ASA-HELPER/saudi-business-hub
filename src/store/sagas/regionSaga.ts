import { call, put, takeLatest } from "redux-saga/effects";
import { fetchRegions } from "../services/regionService";
import {
  fetchRegionsSuccess,
  fetchRegionsFailure,
} from "../actions/regionActions";
import { FETCH_REGIONS_REQUEST, Region } from "../types/regionTypes";

interface ApiResponse {
  success: boolean;
  message: string;
  data: Region[];
}

function* fetchRegionsSaga(): Generator<any, void, ApiResponse> {
  try {
    const response = yield call(fetchRegions);
    yield put(fetchRegionsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchRegionsFailure(error.message));
  }
}

export default function* regionSaga() {
  yield takeLatest(FETCH_REGIONS_REQUEST, fetchRegionsSaga);
}