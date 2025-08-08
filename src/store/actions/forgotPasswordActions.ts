export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_FAILURE = "FORGOT_PASSWORD_FAILURE";

export const forgotPasswordRequest = (email: string) => ({
  type: FORGOT_PASSWORD_REQUEST,
  payload: email,
});

export const forgotPasswordSuccess = (message: string) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: message,
});

export const forgotPasswordFailure = (error: string) => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: error,
});
