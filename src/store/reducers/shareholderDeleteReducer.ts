import {
  DELETE_SHAREHOLDER_REQUEST,
  DELETE_SHAREHOLDER_SUCCESS,
  DELETE_SHAREHOLDER_FAILURE,
  ShareholderActionTypes,
} from "../types/shareholder/shareholderDeleteTypes";

interface ShareholderState {
  loading: boolean;
  error: string | null;
  deletedIds: number[]; // optional: keep track of deleted shareholder IDs
}

const initialState: ShareholderState = {
  loading: false,
  error: null,
  deletedIds: [],
};

const shareholderReducer = (
  state = initialState,
  action: ShareholderActionTypes
): ShareholderState => {
  switch (action.type) {
    case DELETE_SHAREHOLDER_REQUEST:
      return { ...state, loading: true, error: null };
    case DELETE_SHAREHOLDER_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedIds: [...state.deletedIds, action.payload],
      };
    case DELETE_SHAREHOLDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default shareholderReducer;
