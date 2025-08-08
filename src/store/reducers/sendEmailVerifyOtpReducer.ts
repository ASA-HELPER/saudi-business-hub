const initialState = {
  loading: false,
  otpToken: null as string | null,
  expiresIn: null as string | null,
  error: null as string | null,
};

const sendOtpReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SEND_OTP_REQUEST":
      return {
        ...state,
        loading: true,
        otpToken: null,
        expiresIn: null,
        error: null,
      };
    case "SEND_OTP_SUCCESS":
      return {
        ...state,
        loading: false,
        otpToken: action.payload.token,
        expiresIn: action.payload.expires_in,
        error: null,
      };
    case "SEND_OTP_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "RESET_SEND_OTP_FAILURE":
      return { ...initialState };
    default:
      return state;
  }
};

export default sendOtpReducer;
