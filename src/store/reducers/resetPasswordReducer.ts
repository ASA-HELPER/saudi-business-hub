const initialState = {
  loading: false,
  successMessage: "",
  error: null as string | null,
};

const resetPasswordReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "RESET_PASSWORD_REQUEST":
      return { ...state, loading: true, successMessage: "", error: null };
    case "RESET_PASSWORD_SUCCESS":
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
        error: null,
      };
    case "RESET_PASSWORD_FAILURE":
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

export default resetPasswordReducer;
