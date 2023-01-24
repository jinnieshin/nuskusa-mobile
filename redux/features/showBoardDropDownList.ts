import { createSlice } from "@reduxjs/toolkit";

const showBoardDropDownListSlice = createSlice({
  name: "setShowBoardDropDownList",
  initialState: {
    value: false, // hot, freshmen, general, graduated, market(벼룩시장), jobs
  },
  reducers: {
    setShowBoardDropDownList: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setShowBoardDropDownList } = showBoardDropDownListSlice.actions;

export default showBoardDropDownListSlice.reducer;
