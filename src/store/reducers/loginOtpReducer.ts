import {
  LOGIN_OTP_REQUEST,
  LOGIN_OTP_SUCCESS,
  LOGIN_OTP_FAILURE,
} from "../actions/LoginOtpVerifyAction";

const initialState = {
  loading: false,
  data: null,
  error: null,
  success: false,
};

const loginOtpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_OTP_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case LOGIN_OTP_SUCCESS:
      return { ...state, loading: false, data: action.payload, success: true };
    case LOGIN_OTP_FAILURE:
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

export default loginOtpReducer;
