export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

export const resetPasswordRequest = (payload: {
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}) => ({
  type: RESET_PASSWORD_REQUEST,
  payload,
});

export const resetPasswordSuccess = (message: string) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: message,
});

export const resetPasswordFailure = (error: string) => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});
