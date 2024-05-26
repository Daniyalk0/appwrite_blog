import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import themeSlice from "./themeSlice";
import PostsSlice from "./PostsSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    themee: themeSlice,
    posts:PostsSlice,
  },
});

export default store;
