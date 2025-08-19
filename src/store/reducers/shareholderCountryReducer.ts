import {
  FETCH_SHAREHOLDER_COUNTRIES_REQUEST,
  FETCH_SHAREHOLDER_COUNTRIES_SUCCESS,
  FETCH_SHAREHOLDER_COUNTRIES_FAILURE,
  ShareholderCountryState,
} from "../types/shareholderCountryTypes";

const initialState: ShareholderCountryState = {
  loading: false,
  countries: [],
  error: null,
};

const shareholderCountryReducer = (
  state = initialState,
  action: any
): ShareholderCountryState => {
  switch (action.type) {
    case FETCH_SHAREHOLDER_COUNTRIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SHAREHOLDER_COUNTRIES_SUCCESS:
      return { ...state, loading: false, countries: action.payload };
    case FETCH_SHAREHOLDER_COUNTRIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default shareholderCountryReducer;