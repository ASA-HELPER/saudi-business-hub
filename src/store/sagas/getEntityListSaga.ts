import { call, put, takeLatest } from "redux-saga/effects";
import { GET_ENTITY_LIST_REQUEST } from "../types/getEntityList";
import {
  getEntityListSuccess,
  getEntityListFailure,
} from "../actions/getEntityListActions";
import { getEntityListInformation } from "../services/getEntityListService";

function* handleGetEntityList(): Generator<any, void, any> {
  try {
    const response = yield call(getEntityListInformation);
    yield put(getEntityListSuccess(response));
  } catch (error: any) {
    yield put(getEntityListFailure(error.message));
  }
}

export function* entityListSaga() {
  yield takeLatest(GET_ENTITY_LIST_REQUEST, handleGetEntityList);
}
