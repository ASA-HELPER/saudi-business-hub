import {
  FETCH_REGIONS_REQUEST,
  FETCH_REGIONS_SUCCESS,
  FETCH_REGIONS_FAILURE,
  Region
} from "../types/regionTypes";

export const fetchRegionsRequest = () => ({
  type: FETCH_REGIONS_REQUEST,
});

export const fetchRegionsSuccess = (regions: Region[]) => ({
  type: FETCH_REGIONS_SUCCESS,
  payload: regions,
});

export const fetchRegionsFailure = (error: string) => ({
  type: FETCH_REGIONS_FAILURE,
  payload: error,
});