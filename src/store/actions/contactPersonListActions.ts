import { createAction } from "@reduxjs/toolkit";
import { ContactPerson } from "../types/contactPersonListTypes";
import { ApiResponse } from "../types/ApiResponse";

export const fetchContactPersonsListRequest = createAction(
  "FETCH_CONTACT_PERSONS_REQUEST"
);
export const fetchContactPersonsListSuccess = createAction<
  ApiResponse<ContactPerson[]>
>("FETCH_CONTACT_PERSONS_SUCCESS");

export const fetchContactPersonsListFailure = createAction<string>(
  "FETCH_CONTACT_PERSONS_FAILURE"
);
