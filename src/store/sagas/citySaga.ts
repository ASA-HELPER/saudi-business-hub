import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
} from "../types/cityTypes";
import { ApiResponse, fetchCitiesApi } from "../services/cityService";
import { fetchCitiesFailure, fetchCitiesSuccess } from "../actions/cityActions";

function* fetchCitiesWorker(): Generator<any, void, ApiResponse> {
  try {
    const response: ApiResponse = yield call(fetchCitiesApi);
    yield put(fetchCitiesSuccess(response.data));
  } catch (error: any) {
    yield put(fetchCitiesFailure(error.message || "Something went wrong"));
  }
}

export default function* citySaga() {
  yield takeLatest(FETCH_CITIES_REQUEST, fetchCitiesWorker);
}
