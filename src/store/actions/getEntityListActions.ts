import {
  GET_ENTITY_LIST_FAILURE,
  GET_ENTITY_LIST_REQUEST,
  GET_ENTITY_LIST_SUCCESS,
} from "../types/getEntityList";

export const getEntityListRequest = () => ({
  type: GET_ENTITY_LIST_REQUEST,
});

export const getEntityListSuccess = (data: any) => ({
  type: GET_ENTITY_LIST_SUCCESS,
  payload: data,
});

export const getEntityListFailure = (error: any) => ({
  type: GET_ENTITY_LIST_FAILURE,
  payload: error,
});
