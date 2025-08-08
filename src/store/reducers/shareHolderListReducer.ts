import { createReducer } from "@reduxjs/toolkit";
import {
  fetchShareholdersRequest,
  fetchShareholdersSuccess,
  fetchShareholdersFailure,
} from "../actions/shareHolderListAction";
import { ShareholderState } from "../types/shareHolderListTypes";

const initialState: ShareholderState = {
  loading: false,
  data: [],
  error: null,
};

const shareholderReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchShareholdersRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchShareholdersSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchShareholdersFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default shareholderReducer;
