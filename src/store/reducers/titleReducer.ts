import {
  FETCH_TITLES_REQUEST,
  FETCH_TITLES_SUCCESS,
  FETCH_TITLES_FAILURE,
} from "../actions/titleActions";
import { TitleState } from "../types/titleTypes";

const initialState: TitleState = {
  titles: [],
  loading: false,
  error: null,
};

const titleReducer = (state = initialState, action: any): TitleState => {
  switch (action.type) {
    case FETCH_TITLES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TITLES_SUCCESS:
      return { ...state, loading: false, titles: action.payload };
    case FETCH_TITLES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default titleReducer;
