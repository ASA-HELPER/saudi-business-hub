export interface City {
  id: number;
  region_id: number;
  code: string;
  name: string;
  name_en: string;
  name_ar: string;
  created_at: string;
  updated_at: string;
}

export interface CityState {
  loading: boolean;
  error: string | null;
  cities: City[];
}

// Action Types
export const FETCH_CITIES_REQUEST = "FETCH_CITIES_REQUEST";
export const FETCH_CITIES_SUCCESS = "FETCH_CITIES_SUCCESS";
export const FETCH_CITIES_FAILURE = "FETCH_CITIES_FAILURE";

interface FetchCitiesRequestAction {
  type: typeof FETCH_CITIES_REQUEST;
}

interface FetchCitiesSuccessAction {
  type: typeof FETCH_CITIES_SUCCESS;
  payload: City[];
}

interface FetchCitiesFailureAction {
  type: typeof FETCH_CITIES_FAILURE;
  payload: string;
}

export type CityActionTypes =
  | FetchCitiesRequestAction
  | FetchCitiesSuccessAction
  | FetchCitiesFailureAction;
