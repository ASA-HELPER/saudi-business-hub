import { call, put, takeLatest } from "redux-saga/effects";
import { fetchCountries } from "../services/countryService";
import {
  fetchCountriesSuccess,
  fetchCountriesFailure,
} from "../actions/countryActions";
import { FETCH_COUNTRIES_REQUEST, Country } from "../types/countryTypes";

// Define the shape of the API response
interface ApiResponse {
  success: boolean;
  message: string;
  data: Country[];
}

// Fix: Add the Generator return type annotation
function* handleFetchCountries(): Generator<any, void, ApiResponse> {
  try {
    const response: ApiResponse = yield call(fetchCountries);
    yield put(fetchCountriesSuccess(response.data));
  } catch (error: any) {
    yield put(fetchCountriesFailure(error.message || "Something went wrong"));
  }
}

export default function* countrySaga() {
  yield takeLatest(FETCH_COUNTRIES_REQUEST, handleFetchCountries);
}
