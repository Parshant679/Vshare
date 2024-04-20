import { configureStore } from "@reduxjs/toolkit";
import videoDataReducer from "../feature/VideoSlice";
export const store = configureStore({
  reducer: {
    videoData: videoDataReducer,
  },
});
