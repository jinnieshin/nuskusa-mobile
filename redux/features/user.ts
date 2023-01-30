import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const userSlice = createSlice({
  name: "setUser",
  initialState: {
    value: {
      name: "",
      email: "",
      role: "", // User, Registered, Freshmen, Current, Graduated, Admin
      enrolledYear: "",
      major: "",
      faculty: "",
      profileImageUrl: "",
      gender: "",
      yearOfBirth: "",
      kakaoTalkId: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
