import { createSlice } from "@reduxjs/toolkit";

const permissionSlice = createSlice({
  name: "setPermission",
  initialState: {
    value: {
      EDIT: false,
      VIEW: false,
      COMMENT: false,
    },
  },
  reducers: {
    setPermission: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPermission } = permissionSlice.actions;

export default permissionSlice.reducer;
