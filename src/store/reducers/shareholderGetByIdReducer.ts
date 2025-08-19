import {
  GET_SHAREHOLDER_BY_ID_REQUEST,
  GET_SHAREHOLDER_BY_ID_SUCCESS,
  GET_SHAREHOLDER_BY_ID_FAILURE,
  ShareholderByIdState,
  ShareholderByIdActionTypes,
} from "../types/shareholder/shareholderGetByIdTypes";

const initialState: ShareholderByIdState = {
  loading: false,
  error: null,
  data: null,
};

export const shareholderByIdReducer = (
  state = initialState,
  action: ShareholderByIdActionTypes
): ShareholderByIdState => {
  switch (action.type) {
    case GET_SHAREHOLDER_BY_ID_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_SHAREHOLDER_BY_ID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_SHAREHOLDER_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
