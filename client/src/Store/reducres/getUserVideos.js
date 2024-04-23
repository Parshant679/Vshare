import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// there method in create async thunk : pending , fulfilled ans rejected
export const getUserVideos = createAsyncThunk(
  "userVideos/Api.getUserViodes",
  async (userId, { getstate }) => {
    const response = axios.get(
      import.meta.VITE_BASE_ULR + `api/getVideos?${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer lmlkmlk`,
        },
      }
    );

    return response;
  }
);
