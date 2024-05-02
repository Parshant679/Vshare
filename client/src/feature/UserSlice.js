import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: {
    name: null,
    _id: null,
    email: null,
    imageUrl: null,
  },
  connections: [],
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
    searchConnections: (state, action) => {
      state.connections = action.payload;
    },
    deleteSearch: (state, action) => {
      state.connections = state.connections.filter(
        (item) => item._id === action.payload
      );
    },

    changeStatus: (state, action) => {
      state.connections = state.connections.map((item) => {
        if (action.payload === item._id) {
          item.connectionStatus = 2;
          return item;
        }
      });
    },
  },
});

export const { updateUser, searchConnections, deleteSearch, changeStatus } =
  userSlice.actions;
export default userSlice.reducer;
