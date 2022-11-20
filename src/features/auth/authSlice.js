import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: localStorage.getItem("accessToken") ?? "",
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
  },
});

export const { setAccessToken, setShowUnauthorizedModal } = authSlice.actions;

export default authSlice.reducer;
