import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")) ?? {
    email: "",
    id: 0,
    name: "",
    role: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload?.id ?? 0;
      state.name = action.payload?.name ?? "";
      state.email = action.payload?.email ?? "";
      state.role = action.payload?.role ?? "";
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
