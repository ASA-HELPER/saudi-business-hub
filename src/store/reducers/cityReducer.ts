import {
  CityState,
  CityActionTypes,
  FETCH_CITIES_REQUEST,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
} from "../types/cityTypes";

const initialState: CityState = {
  loading: false,
  error: null,
  cities: [],
};

const cityReducer = (
  state = initialState,
  action: CityActionTypes
): CityState => {
  switch (action.type) {
    case FETCH_CITIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CITIES_SUCCESS:
      return { ...state, loading: false, cities: action.payload };
    case FETCH_CITIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default cityReducer;
