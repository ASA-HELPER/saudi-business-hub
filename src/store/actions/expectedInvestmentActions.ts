import { ExpectedInvestment } from "../types/ExpectedInvestment";

export const FETCH_EXPECTED_INVESTMENTS_REQUEST =
  "FETCH_EXPECTED_INVESTMENTS_REQUEST";
export const FETCH_EXPECTED_INVESTMENTS_SUCCESS =
  "FETCH_EXPECTED_INVESTMENTS_SUCCESS";
export const FETCH_EXPECTED_INVESTMENTS_FAILURE =
  "FETCH_EXPECTED_INVESTMENTS_FAILURE";

export const fetchExpectedInvestmentsRequest = () => ({
  type: FETCH_EXPECTED_INVESTMENTS_REQUEST,
});

export const fetchExpectedInvestmentsSuccess = (
  payload: ExpectedInvestment[]
) => ({
  type: FETCH_EXPECTED_INVESTMENTS_SUCCESS,
  payload,
});

export const fetchExpectedInvestmentsFailure = (error: string) => ({
  type: FETCH_EXPECTED_INVESTMENTS_FAILURE,
  payload: error,
});
