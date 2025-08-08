import { createReducer } from "@reduxjs/toolkit";
import {
  fetchLegalStatusRequest,
  fetchLegalStatusSuccess,
  fetchLegalStatusFailure,
} from "../actions/legalStatusActions";
import { LegalStatus } from "../types/legalStatus";

interface LegalStatusState {
  loading: boolean;
  error: string | null;
  data: LegalStatus[];
}

const initialState: LegalStatusState = {
  loading: false,
  error: null,
  data: [],
};

const legalStatusReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchLegalStatusRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchLegalStatusSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchLegalStatusFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default legalStatusReducer;
