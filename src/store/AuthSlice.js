import { createSlice } from "@reduxjs/toolkit";
import { getUserData, removeUserData } from "../services/storage/Storage.";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggIn: false,
    authToken: getUserData() !== null ? true : false,
  },
  reducers: {
    login: (state) => {
      state.isLoggIn = true;
      state.authToken = getUserData() !== null ? true : false;
    },
    logout: (state) => {
      state.isLoggIn = false;
      removeUserData();
      state.authToken = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice;
