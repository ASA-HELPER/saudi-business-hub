import { createReducer } from "@reduxjs/toolkit";
import {
  fetchStructureRequest,
  fetchStructureSuccess,
  fetchStructureFailure,
} from "../actions/businessRegActions";
import { StructureResponse } from "../types/businessStructure";

interface StructureState {
  loading: boolean;
  error: string | null;
  data: StructureResponse | null;
}

const initialState: StructureState = {
  loading: false,
  error: null,
  data: null,
};

const structureReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchStructureRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchStructureSuccess, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    })
    .addCase(fetchStructureFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default structureReducer;
