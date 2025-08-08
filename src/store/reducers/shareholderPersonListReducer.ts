import { createReducer } from "@reduxjs/toolkit";
import {
  fetchShareholderPersonsRequest,
  fetchShareholderPersonsSuccess,
  fetchShareholderPersonsFailure,
} from "../actions/shareholderPersonListActions";
import { ContactPerson } from "../types/contactPersonListTypes";

interface ShareholderPersonState {
  data: ContactPerson[];
  loading: boolean;
  error: string | null;
}

const initialState: ShareholderPersonState = {
  data: [],
  loading: false,
  error: null,
};

export const shareholderPersonListReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(fetchShareholderPersonsRequest, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShareholderPersonsSuccess, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchShareholderPersonsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
);
