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
import "font-awesome/css/font-awesome.min.css";
import { getDPid } from "./store/UserDPslice";

function App() {
  const authData = useSelector((state) => state.auth.userData);
  const postData = useSelector((state) => state.posts.postsData);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
const [Files, setFiles] = useState()
  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 2000); // Change 2000 to your desired loading time in milliseconds

    return () => clearTimeout(timeout);
  }, []);
  const idRegex = /user:([\w\d:-]+)/;

  // function extractIDsFromObjects(objects) {
  //   const allIds = [];

  //   objects.forEach((obj) => {
  //     const permissions = obj.$permissions || [];
  //     const ids = permissions
  //       .map((permission) => {
  //         const match = permission.match(idRegex);
  //         return match ? match[1] : null; // Extract the captured group
  //       })
  //       .filter((id) => id !== null); // Filter out null values (in case there's no match)

  //     allIds.push(...ids); // Push extracted IDs into allIds array
  //   });

  //   return allIds;
  // }
  const userId = authData?.$id;
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData));
        console.log("userData in app.jsx");
      } else {
        dispatch(logout());
        console.log("no userData in app.jsx");
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

  useEffect(() => {
    const fetchFiles = async () => {
      if (!userId) return; // If userId is not available, return early

      try {
        const fetchedFiles = await service.fetchFilesByUserId(userId);
        console.log(fetchedFiles);
        if (fetchedFiles) {
          setFiles(fetchedFiles)
          dispatch(getDPid(fetchedFiles[0]?.$id))
        }else{
          console.log('no files');
        }
      } catch (error) {
        console.error("Failed to fetch files:", error);
      }
    };

    fetchFiles();
  }, [userId]);

  

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
          <Footer />
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
        <h1 className="logo2 text-[30px] mt-[20px] mobile:text-[20px] mobile:mt-[10px] logoText1">
          Log()
        </h1>
      </div>
    </div>
  );
}

export default App;
