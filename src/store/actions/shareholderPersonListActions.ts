import { createAction } from "@reduxjs/toolkit";
import { ContactPerson } from "../types/contactPersonListTypes";
import { ApiResponse } from "../types/ApiResponse";

export const fetchShareholderPersonsRequest = createAction<number>(
  "FETCH_SHAREHOLDER_PERSONS_REQUEST" // payload = customerId
);

export const fetchShareholderPersonsSuccess = createAction<
  ApiResponse<ContactPerson[]>
>("FETCH_SHAREHOLDER_PERSONS_SUCCESS");

export const fetchShareholderPersonsFailure = createAction<string>(
  "FETCH_SHAREHOLDER_PERSONS_FAILURE"
);
