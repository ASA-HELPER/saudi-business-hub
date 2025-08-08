import { createReducer } from "@reduxjs/toolkit";
import {
  createContactPersonRequest,
  createContactPersonSuccess,
  createContactPersonFailure,
} from "../actions/contactPersonActions";

interface ContactPersonState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ContactPersonState = {
  loading: false,
  error: null,
  data: null,
};

const contactPersonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createContactPersonRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createContactPersonSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(createContactPersonFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default contactPersonReducer;
