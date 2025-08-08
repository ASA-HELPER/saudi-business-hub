import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  CountryState,
} from "../types/countryTypes";

const initialState: CountryState = {
  loading: false,
  countries: [],
  error: null,
};

const countryReducer = (state = initialState, action: any): CountryState => {
  switch (action.type) {
    case FETCH_COUNTRIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_COUNTRIES_SUCCESS:
      return { ...state, loading: false, countries: action.payload };
    case FETCH_COUNTRIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default countryReducer;
