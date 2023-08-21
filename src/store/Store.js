import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import newsSlice from "./NewsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    news: newsSlice.reducer,
  },
});

export default store;
