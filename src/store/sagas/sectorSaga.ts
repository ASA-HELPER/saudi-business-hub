import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_SECTORS_REQUEST,
  fetchSectorsSuccess,
  fetchSectorsFailure,
} from "../actions/sectorActions";
import { fetchSectors, ApiResponse } from "../services/sectorService";

function* fetchSectorsSaga(): Generator<any, void, ApiResponse> {
  try {
    const response: ApiResponse = yield call(fetchSectors);

    if (response.success) {
      yield put(fetchSectorsSuccess(response.data));
    } else {
      yield put(fetchSectorsFailure("Failed to load sectors."));
    }
  } catch (error: any) {
    yield put(fetchSectorsFailure(error.message));
  }
}

export default function* sectorWatcher() {
  yield takeLatest(FETCH_SECTORS_REQUEST, fetchSectorsSaga);
}
