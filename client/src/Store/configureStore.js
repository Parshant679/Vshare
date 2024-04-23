import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "../feature/UserSlice";
import videoDataReducer from "../feature/VideoSlice";
export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    videoData: videoDataReducer,
  },
});
