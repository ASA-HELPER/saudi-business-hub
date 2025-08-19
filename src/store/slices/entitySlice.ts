import { createSlice } from "@reduxjs/toolkit";

const entitySlice = createSlice({
  name: "entity",
  initialState: { hasFetched: false },
  reducers: {
    setHasFetched: (state, action) => {
      state.hasFetched = action.payload;
    },
  },
});

export const { setHasFetched } = entitySlice.actions;
