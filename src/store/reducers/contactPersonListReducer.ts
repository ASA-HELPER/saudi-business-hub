import { createReducer } from "@reduxjs/toolkit";
import {
  fetchContactPersonsListRequest,
  fetchContactPersonsListSuccess,
  fetchContactPersonsListFailure,
} from "../actions/contactPersonListActions";
import { ContactPerson } from "../types/contactPersonListTypes";

interface ContactPersonState {
  data: ContactPerson[];
  loading: boolean;
  error: string | null;
}

const initialState: ContactPersonState = {
  data: [],
  loading: false,
  error: null,
};

const contactPersonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchContactPersonsListRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchContactPersonsListSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    })
    .addCase(fetchContactPersonsListFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default contactPersonReducer;
