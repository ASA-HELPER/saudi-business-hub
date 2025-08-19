export const FETCH_SHAREHOLDER_COUNTRIES_REQUEST = "FETCH_SHAREHOLDER_COUNTRIES_REQUEST";
export const FETCH_SHAREHOLDER_COUNTRIES_SUCCESS = "FETCH_SHAREHOLDER_COUNTRIES_SUCCESS";
export const FETCH_SHAREHOLDER_COUNTRIES_FAILURE = "FETCH_SHAREHOLDER_COUNTRIES_FAILURE";

export interface ShareholderCountry {
  id: number;
  code: string;
  name_en: string;
  name_ar: string | null;
  phone_prefix: number;
  blacklisted: boolean;
  is_share_holder_check: boolean;
  nationality: string | null;
  active: number;
  created_at: string | null;
  updated_at: string | null;
  deleted_at: string | null;
}

export interface ShareholderCountryState {
  loading: boolean;
  countries: ShareholderCountry[];
  error: string | null;
}
