export const REGISTER_ENTITY_REQUEST = "REGISTER_ENTITY_REQUEST";
export const REGISTER_ENTITY_SUCCESS = "REGISTER_ENTITY_SUCCESS";
export const REGISTER_ENTITY_FAILURE = "REGISTER_ENTITY_FAILURE";

export const registerEntityRequest = (payload: any) => ({
  type: REGISTER_ENTITY_REQUEST,
  payload,
});

export const registerEntitySuccess = (data: any) => ({
  type: REGISTER_ENTITY_SUCCESS,
  payload: data,
});

export const registerEntityFailure = (error: string) => ({
  type: REGISTER_ENTITY_FAILURE,
  payload: error,
});
