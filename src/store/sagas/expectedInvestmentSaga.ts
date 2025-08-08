import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_EXPECTED_INVESTMENTS_REQUEST,
  fetchExpectedInvestmentsSuccess,
  fetchExpectedInvestmentsFailure,
} from "../actions/expectedInvestmentActions";
import { fetchExpectedInvestmentsApi } from "../services/expectedInvestmentService";

function* handleFetchExpectedInvestments(): Generator<any, void, any> {
  try {
    const response = yield call(fetchExpectedInvestmentsApi);
    yield put(fetchExpectedInvestmentsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchExpectedInvestmentsFailure(error.message || "Unexpected error")
    );
  }
}

export default function* expectedInvestmentSaga() {
  yield takeLatest(
    FETCH_EXPECTED_INVESTMENTS_REQUEST,
    handleFetchExpectedInvestments
  );
}
