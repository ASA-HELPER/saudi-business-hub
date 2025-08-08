import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/registerActions";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const registerReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case REGISTER_SUCCESS:
      return { ...state, loading: false, data: action.payload, success: true };
    case REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export default registerReducer;
