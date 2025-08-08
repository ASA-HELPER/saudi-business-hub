const initialState = {
  loading: false,
  successMessage: "",
  error: null as string | null,
};

const forgotPasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "FORGOT_PASSWORD_REQUEST":
      return { ...state, loading: true, successMessage: "", error: null };
    case "FORGOT_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
        error: null,
      };
    case "FORGOT_PASSWORD_FAILURE":
      return {
        ...state,
        loading: false,
        successMessage: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default forgotPasswordReducer;
