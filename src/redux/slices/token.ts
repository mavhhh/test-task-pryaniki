import { createSlice } from "@reduxjs/toolkit";

const storedToken = localStorage.getItem("pryaniki-token");

const initialState = {
  token: storedToken || "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("pryaniki-token", action.payload);
    },
  },
});

export const { setToken } = tokenSlice.actions;

export default tokenSlice.reducer;
