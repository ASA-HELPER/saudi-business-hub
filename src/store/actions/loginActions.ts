export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginRequest = (payload: {
  username: string;
  password: string;
  captchaToken: string;
}) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error: string) => ({
  type: LOGIN_FAILURE,
  payload: error,
});
