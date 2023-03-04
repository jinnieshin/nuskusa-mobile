import { createSlice } from "@reduxjs/toolkit";

const commentContentSlice = createSlice({
  name: "setCommentContent",
  initialState: {
    value: "", // Comment content through text input
  },
  reducers: {
    setCommentContent: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCommentContent } = commentContentSlice.actions;

export default commentContentSlice.reducer;
