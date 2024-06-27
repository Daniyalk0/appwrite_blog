import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(state);
      (state.authStatus = true), (state.userData = action.payload);
    },
    logout: (state) => {
      (state.authStatus = false), (state.userData = null);
    },
    update: (state, action) => {
      if (state) {
        state.name = action.payload.name;
        state.email = action.payload.email;
      }
      // state.authStatus = false,
    },
  },
});

export const { login, logout,update } = authSlice.actions;
export default authSlice.reducer;
