import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    name: null,
    _id: null,
    email: null,
    imageUrl: null,
  },
};

const userSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user._id = action.payload._id;
      state.user.email = action.payload.email;
      state.user.imageUrl = action.payload.imageUrl;
    },
  },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
