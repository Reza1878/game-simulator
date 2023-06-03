import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")) ?? {
    email: "",
    id: 0,
    name: "",
    role: "",
    user_tier: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload?.id ?? 0;
      state.name = action.payload?.name ?? "";
      state.email = action.payload?.email ?? "";
      state.role = action.payload?.role ?? "";
      state.user_tier = action.payload?.user_tier ?? null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
