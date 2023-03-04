import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import boardReducer from "./features/board";
import permissionReducer from "./features/permission";
import currentBoardPageReducer from "./features/currentBoardPage";
import showBoardDropDownListReducer from "./features/showBoardDropDownList";
import openCommentInputReducer from "./features/openCommentInput";
import commentContentReducer from "./features/commentContent";
const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    permission: permissionReducer,
    currentBoardPage: currentBoardPageReducer,
    showBoardDropDownList: showBoardDropDownListReducer,
    openCommentInput: openCommentInputReducer,
    commentContent: commentContentReducer,
  },
});

export default store;
