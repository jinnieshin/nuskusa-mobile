import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../types/Board";

const boardSlice = createSlice({
  name: "setBoard",
  initialState: {
    value: {
      title: "",
      boardId: "",
      description: "",
      boardColor: "",
      boardTextColor: "",
    },
  },
  reducers: {
    setBoard: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setBoard } = boardSlice.actions;

export default boardSlice.reducer;
