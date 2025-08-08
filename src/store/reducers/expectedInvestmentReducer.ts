import {
  FETCH_EXPECTED_INVESTMENTS_REQUEST,
  FETCH_EXPECTED_INVESTMENTS_SUCCESS,
  FETCH_EXPECTED_INVESTMENTS_FAILURE,
} from "../actions/expectedInvestmentActions";
import { ExpectedInvestment } from "../types/ExpectedInvestment";

interface State {
  loading: boolean;
  data: ExpectedInvestment[];
  error: string | null;
}

const initialState: State = {
  loading: false,
  data: [],
  error: null,
};

const expectedInvestmentReducer = (
  state = initialState,
  action: any
): State => {
  switch (action.type) {
    case FETCH_EXPECTED_INVESTMENTS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_EXPECTED_INVESTMENTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_EXPECTED_INVESTMENTS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default expectedInvestmentReducer;
