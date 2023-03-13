import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user";
import boardReducer from "./features/board";
import permissionReducer from "./features/permission";
import currentBoardPageReducer from "./features/currentBoardPage";
import showBoardDropDownListReducer from "./features/showBoardDropDownList";
import openCommentInputReducer from "./features/openCommentInput";
import commentContentReducer from "./features/commentContent";
import refreshReducer from "./features/refresher";

const store = configureStore({
  reducer: {
    user: userReducer,
    board: boardReducer,
    permission: permissionReducer,
    currentBoardPage: currentBoardPageReducer,
    showBoardDropDownList: showBoardDropDownListReducer,
    openCommentInput: openCommentInputReducer,
    commentContent: commentContentReducer,
    refresh: refreshReducer,
  },
});

export default store;
