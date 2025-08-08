import {
  FETCH_REGISTRATION_TYPES_REQUEST,
  FETCH_REGISTRATION_TYPES_SUCCESS,
  FETCH_REGISTRATION_TYPES_FAILURE,
  SELECT_REGISTRATION_TYPE,
} from '../actions/registrationTypeActions';
import { RegistrationTypeState } from '../types/registrationTypes';

const initialState: RegistrationTypeState = {
  types: [],
  loading: false,
  error: null,
  selectedType: null,
};

export const registrationTypeReducer = (
  state = initialState,
  action: any
): RegistrationTypeState => {
  switch (action.type) {
    case FETCH_REGISTRATION_TYPES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_REGISTRATION_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        types: action.payload,
        error: null,
      };
    case FETCH_REGISTRATION_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        types: [],
      };
    case SELECT_REGISTRATION_TYPE:
      return {
        ...state,
        selectedType: action.payload,
      };
    default:
      return state;
  }
};