import {
  FETCH_SHAREHOLDER_COUNTRIES_REQUEST,
  FETCH_SHAREHOLDER_COUNTRIES_SUCCESS,
  FETCH_SHAREHOLDER_COUNTRIES_FAILURE,
  ShareholderCountry,
} from "../types/shareholderCountryTypes";

export const fetchShareholderCountriesRequest = () => ({
  type: FETCH_SHAREHOLDER_COUNTRIES_REQUEST,
});

export const fetchShareholderCountriesSuccess = (
  countries: ShareholderCountry[]
) => ({
  type: FETCH_SHAREHOLDER_COUNTRIES_SUCCESS,
  payload: countries,
});

export const fetchShareholderCountriesFailure = (error: string) => ({
  type: FETCH_SHAREHOLDER_COUNTRIES_FAILURE,
  payload: error,
});
