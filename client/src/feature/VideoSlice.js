import { createSlice } from "@reduxjs/toolkit";
import { getUserViodes } from "../Store/reducres/getUserVideos";
const initialState = {
  Videos: [],
  vidoeCount: 10,
};

const videoSlice = createSlice({
  name: "userVideoSlice",
  initialState,
  reducers: {
    deleteVideos: (state, action) => {
      state.Videos = state.Videos.filter((item) => {
        if (!action.payload.includes(item._id)) {
          return item;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserViodes.fulfilled, (state, action) => {
      if (action.payload) {
        state.Videos = action.payload;
      }
    });
  },
});

export const { deleteVideos } = videoSlice.actions;
export default videoSlice.reducer;
