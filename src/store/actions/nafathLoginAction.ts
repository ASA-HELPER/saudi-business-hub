export const NAFATH_LOGIN_REQUEST = "NAFATH_LOGIN_REQUEST";
export const NAFATH_LOGIN_SUCCESS = "NAFATH_LOGIN_SUCCESS";
export const NAFATH_LOGIN_FAILURE = "NAFATH_LOGIN_FAILURE";

export const nafthLoginRequest = (payload: {
  nafathID: number;
}) => ({
  type: NAFATH_LOGIN_REQUEST,
  payload,
});

export const nafthLoginSuccess = (data: any) => ({
  type: NAFATH_LOGIN_SUCCESS,
  payload: data,
});

export const nafthLoginFailure = (error: string) => ({
  type: NAFATH_LOGIN_FAILURE,
  payload: error,
});
