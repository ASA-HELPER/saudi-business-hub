import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_TITLES_REQUEST,
  fetchTitlesSuccess,
  fetchTitlesFailure,
} from "../actions/titleActions";
import { fetchTitles } from "../services/titleService";

function* fetchTitlesSaga(): Generator<any, void, any> {
  try {
    const response = yield call(fetchTitles);
    if (response.success) {
      yield put(fetchTitlesSuccess(response.data));
    } else {
      yield put(fetchTitlesFailure("Failed to fetch titles"));
    }
  } catch (error: any) {
    yield put(fetchTitlesFailure(error.message));
  }
}

export default function* titleWatcher() {
  yield takeLatest(FETCH_TITLES_REQUEST, fetchTitlesSaga);
}
