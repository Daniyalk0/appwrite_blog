import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import themeSlice from "./themeSlice";
import PostsSlice from "./PostsSlice";
import UserDPslice from "./UserDPslice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    themee: themeSlice,
    posts:PostsSlice,
    userDP:UserDPslice,
  },
});

export default store;
