import {
  FETCH_REGIONS_REQUEST,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  RegionState
} from "../types/regionTypes";

const initialState: RegionState = {
  loading: false,
  regions: [],
  error: null,
};

export default function regionReducer(state = initialState, action: any): RegionState {
  switch (action.type) {
    case FETCH_REGIONS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_REGIONS_SUCCESS:
      return { ...state, loading: false, regions: action.payload };
    case FETCH_REGIONS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}