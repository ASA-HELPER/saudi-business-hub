import {
  FETCH_SECTORS_REQUEST,
  FETCH_SECTORS_SUCCESS,
  FETCH_SECTORS_FAILURE,
} from "../actions/sectorActions";
import { Sector } from "../types/sectorTypes";

interface SectorState {
  sectors: Sector[];
  loading: boolean;
  error: string | null;
}

const initialState: SectorState = {
  sectors: [],
  loading: false,
  error: null,
};

export const sectorReducer = (
  state = initialState,
  action: any
): SectorState => {
  switch (action.type) {
    case FETCH_SECTORS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_SECTORS_SUCCESS:
      return { ...state, loading: false, sectors: action.payload };
    case FETCH_SECTORS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
