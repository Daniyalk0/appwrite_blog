import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import AuthLayout from "./components/AuthLayout.jsx";
import Home from "./components/Home.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";
import CreatePost from "./components/CreatePost.jsx";
import YourPosts from "./components/YourPosts.jsx";
import Profile from "./components/Profile.jsx";
import AllPosts from "./components/AllPosts.jsx";
import Post from "./components/Post.jsx";
import EditPost from "./components/EditPost.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import Font Awesome CSS
import './index.css';
import Usercard from "./components/Usercard.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/createPost",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <CreatePost />
                </AuthLayout>
            ),
        },
        {
            path: "/yourPosts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <YourPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/profile",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Profile />
                </AuthLayout>
            ),
        },
        {
            path: "/allPosts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/editPost/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/userCard/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <Usercard />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post/>
        },
    ],
},
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>   
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
