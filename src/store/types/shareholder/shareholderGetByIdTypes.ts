import {
  ExistingShareholder,
  OrganizationShareholder,
  PersonShareholder,
} from "./ShareholderInfoTypes";

// Action constants
export const GET_SHAREHOLDER_BY_ID_REQUEST = "GET_SHAREHOLDER_BY_ID_REQUEST";
export const GET_SHAREHOLDER_BY_ID_SUCCESS = "GET_SHAREHOLDER_BY_ID_SUCCESS";
export const GET_SHAREHOLDER_BY_ID_FAILURE = "GET_SHAREHOLDER_BY_ID_FAILURE";

export interface Title {
  id: number;
  token: string;
  identifier: string;
}

// All shareholder variations
export type ShareholderPerson = {
  [K in keyof PersonShareholder]: PersonShareholder[K];
};

export type ShareholderOrganization = {
  [K in keyof OrganizationShareholder]: OrganizationShareholder[K];
};

export type ShareholderExisting = {
  [K in keyof ExistingShareholder]: ExistingShareholder[K];
};

// Main API response type
export interface ShareholderInfoByIdResponse {
  success: boolean;
  message: string;
  data: {
    person: Partial<ShareholderPerson>;
    organization: Partial<ShareholderOrganization>;
    existing: Partial<ShareholderExisting>;
  };
}

// Actions
export interface GetShareholderByIdRequestAction {
  type: typeof GET_SHAREHOLDER_BY_ID_REQUEST;
  payload: number; // shareholder ID
}

export interface GetShareholderByIdSuccessAction {
  type: typeof GET_SHAREHOLDER_BY_ID_SUCCESS;
  payload: ShareholderInfoByIdResponse;
}

export interface GetShareholderByIdFailureAction {
  type: typeof GET_SHAREHOLDER_BY_ID_FAILURE;
  payload: string; // error message
}

// State interface
export interface ShareholderByIdState {
  loading: boolean;
  error: string | null;
  data: ShareholderInfoByIdResponse | null;
}

// Action type union
export type ShareholderByIdActionTypes =
  | GetShareholderByIdRequestAction
  | GetShareholderByIdSuccessAction
  | GetShareholderByIdFailureAction;
