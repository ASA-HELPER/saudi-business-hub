export const FETCH_SECTORS_REQUEST = "FETCH_SECTORS_REQUEST";
export const FETCH_SECTORS_SUCCESS = "FETCH_SECTORS_SUCCESS";
export const FETCH_SECTORS_FAILURE = "FETCH_SECTORS_FAILURE";

export const fetchSectorsRequest = () => ({
  type: FETCH_SECTORS_REQUEST,
});

export const fetchSectorsSuccess = (data: any) => ({
  type: FETCH_SECTORS_SUCCESS,
  payload: data,
});

export const fetchSectorsFailure = (error: string) => ({
  type: FETCH_SECTORS_FAILURE,
  payload: error,
});
