export const FETCH_COUNTRIES_REQUEST = "FETCH_COUNTRIES_REQUEST";
export const FETCH_COUNTRIES_SUCCESS = "FETCH_COUNTRIES_SUCCESS";
export const FETCH_COUNTRIES_FAILURE = "FETCH_COUNTRIES_FAILURE";

export interface Country {
  id: number;
  name: string;
  name_en: string;
  name_ar: string;
  code: string;
  phone_prefix: number;
}

export interface CountryState {
  loading: boolean;
  countries: Country[];
  error: string | null;
}
