import { createReducer } from "@reduxjs/toolkit";
import {
  createShareholderRequest,
  createShareholderSuccess,
  createShareholderFailure,
} from "../actions/shareHolderCreateAction";

interface CreateShareholderState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CreateShareholderState = {
  loading: false,
  error: null,
  success: false,
};

const createShareholderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createShareholderRequest, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    })
    .addCase(createShareholderSuccess, (state) => {
      state.loading = false;
      state.success = true;
    })
    .addCase(createShareholderFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default createShareholderReducer;
