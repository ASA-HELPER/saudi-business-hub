import { call, put, takeLatest } from "redux-saga/effects";
import {
  deleteAttachmentSuccess,
  deleteAttachmentFailure,
} from "../actions/attachmentDeleteActions";
import { deleteAttachment } from "../services/attachmentDeleteService";
import { DELETE_ATTACHMENT_REQUEST } from "../types/deleteAttachmentTypes";

function* handleDeleteAttachment(action: any): any {
  try {
    const response = yield call(deleteAttachment, action.payload);
    if (response.success) {
      yield put(deleteAttachmentSuccess(response.message));
    } else {
      yield put(deleteAttachmentFailure(response.message || "Delete failed"));
    }
  } catch (error: any) {
    yield put(deleteAttachmentFailure(error.message));
  }
}

export default function* deleteAttachmentSaga() {
  yield takeLatest(DELETE_ATTACHMENT_REQUEST, handleDeleteAttachment);
}
