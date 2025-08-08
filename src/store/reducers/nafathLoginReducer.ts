import {
  NAFATH_LOGIN_REQUEST,
  NAFATH_LOGIN_SUCCESS,
  NAFATH_LOGIN_FAILURE,
} from "../actions/nafathLoginAction";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const nafathLoginReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case NAFATH_LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case NAFATH_LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case NAFATH_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default nafathLoginReducer;
