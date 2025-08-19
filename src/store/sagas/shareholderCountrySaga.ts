import { call, put, takeLatest } from "redux-saga/effects";
import { fetchShareholderCountries } from "../services/shareholderCountryService";
import {
  fetchShareholderCountriesSuccess,
  fetchShareholderCountriesFailure,
} from "../actions/shareholderCountryActions";
import {
  FETCH_SHAREHOLDER_COUNTRIES_REQUEST,
  ShareholderCountry,
} from "../types/shareholderCountryTypes";

interface ApiResponse {
  success: boolean;
  message: string;
  data: ShareholderCountry[];
}

function* handleFetchShareholderCountries(): Generator<any, void, ApiResponse> {
  try {
    const response: ApiResponse = yield call(fetchShareholderCountries);
    yield put(fetchShareholderCountriesSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchShareholderCountriesFailure(
        error.message || "Something went wrong"
      )
    );
  }
}

export default function* shareholderCountrySaga() {
  yield takeLatest(
    FETCH_SHAREHOLDER_COUNTRIES_REQUEST,
    handleFetchShareholderCountries
  );
}
