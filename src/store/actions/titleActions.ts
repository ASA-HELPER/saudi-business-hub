export const FETCH_TITLES_REQUEST = "FETCH_TITLES_REQUEST";
export const FETCH_TITLES_SUCCESS = "FETCH_TITLES_SUCCESS";
export const FETCH_TITLES_FAILURE = "FETCH_TITLES_FAILURE";

export const fetchTitlesRequest = () => ({
  type: FETCH_TITLES_REQUEST,
});

export const fetchTitlesSuccess = (titles: any) => ({
  type: FETCH_TITLES_SUCCESS,
  payload: titles,
});

export const fetchTitlesFailure = (error: string) => ({
  type: FETCH_TITLES_FAILURE,
  payload: error,
});
