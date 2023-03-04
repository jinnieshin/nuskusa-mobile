import { createSlice } from "@reduxjs/toolkit";

const openCommentInputSlice = createSlice({
  name: "setOpenCommentInput",
  initialState: {
    value: false,
  },
  reducers: {
    setOpenCommentInput: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOpenCommentInput } = openCommentInputSlice.actions;

export default openCommentInputSlice.reducer;
