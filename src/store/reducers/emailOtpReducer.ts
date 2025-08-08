import {
  VERIFY_REGISTER_MAIL_OTP_REQUEST,
  VERIFY_REGISTER_MAIL_OTP_SUCCESS,
  VERIFY_REGISTER_MAIL_OTP_FAILURE,
  RESET_VERIFY_MAIL_OTP_STATE,
} from "../types/emailOtpTypes";

const initialState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const emailOtpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case VERIFY_REGISTER_MAIL_OTP_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case VERIFY_REGISTER_MAIL_OTP_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case VERIFY_REGISTER_MAIL_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case RESET_VERIFY_MAIL_OTP_STATE:
      return { ...initialState };
    default:
      return state;
  }
};

export default emailOtpReducer;
