export const FETCH_REGIONS_REQUEST = "FETCH_REGIONS_REQUEST";
export const FETCH_REGIONS_SUCCESS = "FETCH_REGIONS_SUCCESS";
export const FETCH_REGIONS_FAILURE = "FETCH_REGIONS_FAILURE";

export interface Region {
  id: number;
  code: string;
  name: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface RegionState {
  loading: boolean;
  regions: Region[];
  error: string | null;
}