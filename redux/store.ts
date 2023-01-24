import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import boardReducer from "./features/board";
import permissionReducer from "./features/permission";
import currentBoardPageReducer from "./features/currentBoardPage";
import showBoardDropDownListReducer from "./features/showBoardDropDownList";
const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    permission: permissionReducer,
    currentBoardPage: currentBoardPageReducer,
    showBoardDropDownList: showBoardDropDownListReducer,
  },
});

export default store;
