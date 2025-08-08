import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  Country,
} from "../types/countryTypes";

export const fetchCountriesRequest = () => ({
  type: FETCH_COUNTRIES_REQUEST,
});

export const fetchCountriesSuccess = (countries: Country[]) => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

export const fetchCountriesFailure = (error: string) => ({
  type: FETCH_COUNTRIES_FAILURE,
  payload: error,
});
