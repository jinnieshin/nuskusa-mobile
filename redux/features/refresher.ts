import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "setRefresh",
  initialState: {
    value: false,
  },
  reducers: {
    setRefresh: (state) => {
      state.value = !state.value;
    },
  },
});

export const { setRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
