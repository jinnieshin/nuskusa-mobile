import { createSlice } from "@reduxjs/toolkit";

const currentBoardPageSlice = createSlice({
  name: "setCurrentBoardPage",
  initialState: {
    value: "freshmen", // hot, freshmen, general, graduated, market(벼룩시장), jobs
  },
  reducers: {
    setCurrentBoardPage: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCurrentBoardPage } = currentBoardPageSlice.actions;

export default currentBoardPageSlice.reducer;
