import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  path: null,
};

const privateRecordPath = createSlice({
  name: "coin",
  initialState,
  reducers: {
    setPath(state, action) {
      state.path = action.payload;
    },
  },
});

export const { setPath } = privateRecordPath.actions;
export default privateRecordPath.reducer;
