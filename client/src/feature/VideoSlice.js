import { createSlice } from "@reduxjs/toolkit";
import { getUserVideos } from "../Store/reducres/getUserVideos";
const initialState = {
  Videos: [],
  videoCount: 10,
};

const videoSlice = createSlice({
  name: "userVideoSlice",
  initialState,
  reducers: {
    deleteVideos: (state, action) => {
      state.Videos = state.Videos.filter((item) => {
        if (action.payload !== item._id) {
          return item;
        }
      });
    },
    addVideos: (state, action) => {
      state.Videos = action.payload.filter((item) => {
        if (!state.Videos.includes(item._id)) {
          return item;
        }
      });
      console.log(state.Videos);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserVideos.fulfilled, (state, action) => {
      if (action.payload) {
        state.Videos = action.payload;
      }
    });
  },
});

export const { deleteVideos, addVideos } = videoSlice.actions;
export default videoSlice.reducer;
