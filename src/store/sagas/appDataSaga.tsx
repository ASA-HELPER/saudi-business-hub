import { takeLatest, put } from 'redux-saga/effects';
function* fetchAppData() { yield put({ type: 'SET_APP_DATA', payload: ['Example update'] }); }
export function* watchAppDataSaga() { yield takeLatest('FETCH_APP_DATA', fetchAppData); }