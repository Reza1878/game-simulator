import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") ?? "",
    refreshToken: localStorage.getItem("refreshToken") ?? "",
    showUnauthorizedModal: false,
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setShowUnauthorizedModal: (state, action) => {
      state.showUnauthorizedModal = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
  },
});

export const { setAccessToken, setShowUnauthorizedModal, setRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
