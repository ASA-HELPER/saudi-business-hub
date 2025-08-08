import { RegistrationType } from '../types/registrationTypes';

export const FETCH_REGISTRATION_TYPES_REQUEST = 'FETCH_REGISTRATION_TYPES_REQUEST';
export const FETCH_REGISTRATION_TYPES_SUCCESS = 'FETCH_REGISTRATION_TYPES_SUCCESS';
export const FETCH_REGISTRATION_TYPES_FAILURE = 'FETCH_REGISTRATION_TYPES_FAILURE';
export const SELECT_REGISTRATION_TYPE = 'SELECT_REGISTRATION_TYPE';

export const fetchRegistrationTypesRequest = () => ({
  type: FETCH_REGISTRATION_TYPES_REQUEST,
});

export const fetchRegistrationTypesSuccess = (types: RegistrationType[]) => ({
  type: FETCH_REGISTRATION_TYPES_SUCCESS,
  payload: types,
});

export const fetchRegistrationTypesFailure = (error: string) => ({
  type: FETCH_REGISTRATION_TYPES_FAILURE,
  payload: error,
});

export const selectRegistrationType = (type: RegistrationType) => ({
  type: SELECT_REGISTRATION_TYPE,
  payload: type,
});