import React, { useEffect, useRef, useState } from "react";
import Container from "./components/Container";
import Home from "./components/Home";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header/Header";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { Outlet } from "react-router-dom";
import Loading from "./components/Loading";
import authService from "./own_appwrite/Auth";
import { login, logout } from "./store/AuthSlice";
import CreatePost from "./components/CreatePost";
import service from "./own_appwrite/Config";
import { getPostsData } from "./store/PostsSlice";
import { FallingLines } from "react-loader-spinner";
import Footer from "./components/Footer/Footer";

function App() {
  const authData = useSelector((state) => state.auth.userData);
  const postData = useSelector((state) => state.posts.postsData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 2000); // Change 2000 to your desired loading time in milliseconds

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData));
        console.log('userData in app.jsx');
      } else {
        dispatch(logout());
        console.log('no userData in app.jsx');
      }
    });
  }, [authService]);

  useEffect(() => {
    service.getPosts().then((post) => {
      if (post) {
        dispatch(getPostsData(post.documents));
      }
    });
  }, [authData, postData]);

  return loading ? (
    <div className="overflow-hidden">
      <Container>
        <div>
          <div>
            <Header className="" />
          </div>
          <main className="">
            <Outlet />
          </main>
        </div>
        <div className="h-[40vh]">
          <Footer/>
        </div>
      </Container>
    </div>
  ) : (
    <div className="w-full h-screen  startLoading flex flex-col justify-center items-center relative">
      <FallingLines
        color="#107758"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
       <div className="flex tablet:translate-x-0 absolute bottom-[70px]">
          <h1 className="logo text-[50px] mobile:text-[30px] logoText1">B.</h1>
          <h1 className="logo2 text-[30px] mt-[20px] mobile:text-[20px] mobile:mt-[10px] logoText1">Log()</h1>
        </div>
    </div>
  );
}

export default App;
