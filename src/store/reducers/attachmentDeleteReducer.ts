import {
  DELETE_ATTACHMENT_REQUEST,
  DELETE_ATTACHMENT_SUCCESS,
  DELETE_ATTACHMENT_FAILURE,
} from "../types/deleteAttachmentTypes";
import { DeleteAttachmentState } from "../types/deleteAttachmentTypes";

const initialState: DeleteAttachmentState = {
  loading: false,
  success: false,
  error: null,
};

const deleteAttachmentReducer = (state = initialState, action: any): DeleteAttachmentState => {
  switch (action.type) {
    case DELETE_ATTACHMENT_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case DELETE_ATTACHMENT_SUCCESS:
      return { ...state, loading: false, success: true };
    case DELETE_ATTACHMENT_FAILURE:
      return { ...state, loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export default deleteAttachmentReducer;
