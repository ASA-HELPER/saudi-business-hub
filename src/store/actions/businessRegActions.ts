import { createAction } from "@reduxjs/toolkit";
import { StructureResponse } from "../types/businessStructure";

export const fetchStructureRequest = createAction<number>(
  "FETCH_STRUCTURE_REQUEST"
);
export const fetchStructureSuccess = createAction<StructureResponse>(
  "FETCH_STRUCTURE_SUCCESS"
);
export const fetchStructureFailure = createAction<string>(
  "FETCH_STRUCTURE_FAILURE"
);
