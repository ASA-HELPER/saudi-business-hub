import { createReducer } from "@reduxjs/toolkit";
import {
  fetchShareholderIdTypesRequest,
  fetchShareholderIdTypesSuccess,
  fetchShareholderIdTypesFailure,
} from "../actions/shareHolderIdActions";
import { ShareholderIdTypeState } from "../types/shareHolderIdTypes";

const initialState: ShareholderIdTypeState = {
  data: [],
  loading: false,
  error: null,
};

const shareholderIdTypeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchShareholderIdTypesRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchShareholderIdTypesSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchShareholderIdTypesFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default shareholderIdTypeReducer;
