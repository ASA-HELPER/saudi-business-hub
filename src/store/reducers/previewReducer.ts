// reducers/previewReducer.ts

import {
  GET_PREVIEW_REQUEST,
  GET_PREVIEW_SUCCESS,
  GET_PREVIEW_FAILURE,
  PreviewResponseData,
} from "../types/previewTypes";

interface PreviewState {
  data: PreviewResponseData | null;
  loading: boolean;
  error: string | null;
}

const initialState: PreviewState = {
  data: null,
  loading: false,
  error: null,
};

const previewReducer = (
  state = initialState,
  action: any
): PreviewState => {
  switch (action.type) {
    case GET_PREVIEW_REQUEST:
      return { ...state, loading: true, error: null };

    case GET_PREVIEW_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case GET_PREVIEW_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default previewReducer;
