import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import service from "../own_appwrite/Config";
import Logout from "./Logout";
import Container from "./Container";
import { NavLink } from "react-router-dom";
import Auth_btn from "../auth/Auth_btn";
import { FaUser } from "react-icons/fa6";

function Profile() {
  const [posts, setposts] = useState([]);
  const [user, setuser] = useState(null);
  const postsdata = useSelector((state) => state.posts.postsData);
  const userdata = useSelector((state) => state.auth.userData);
  const [gotDP, setGotDP] = useState(null);
  const userDP = useSelector((state) => state.userDP.userPic);

  useEffect(() => {
    const data = postsdata.filter((post) => post.userId === userdata.$id);
    setposts(data);
  }, [userdata]);

  useEffect(() => {
    if (userdata) {
      setuser(userdata);
    } else {
      alert("no user data");
    }
  }, [userdata]);

  useEffect(() => {
    if (userDP) {
      setGotDP(userDP);
    }
  }, []);

  return (
    <Container className="h-screen">
      <div
        className={`w-full h-full flex-col  flex justify-center items-center relative `}
      >
        <h1 className="top-[23vh] text-[30px] dark:text-white bg-slate-300 dark:bg-zinc-800 text-center  logo2 rounded-md shadow-top absolute z-10">
          Profile
        </h1>
        <div
          className="  w-[512px] mobile:w-[300px] h-[350px] mx-[30px] bg-slate-300 rounded-xl p-3 px-[9px] flex justify-center flex-col items-center relative z-6  dark:bg-zinc-800 dark:hover:shadow-lg dark:hover:shadow-zinc-500 transition-all duration-300 mt-[60px] tablet:mt-0"
          key={userdata.$id}
        >
       
          <div className="w-[80%] h-full flex gap-[20px] flex-col  m-3 dark:text-white justify-center profile">
          {gotDP ? (
            <img
              src={service.getDPPreview(gotDP)}
              className={`h-[50px] w-[50px] mobile:mr-[20px]  rounded-3xl mt-[5px]   cursor-pointer`}
            />
          ) : (
            <FaUser className="w-[50px] h-[60px] tablet:w-[30px] tablet:h-[30px] mobile:h-[25px] mobile:w-[25px] text-zinc-800 dark:text-zinc-300" />
          )}
            <h1 className="text-start flex text-[20px] items-center mobile:text-[15px]">
              Name:{" "}
              <h1 className="ml-[8px] font-bold text-[30px] tablet:text-[20px] mobile:text-[17px] dark:text-bglight text-zinc-800">
                {user?.name}
              </h1>
            </h1>
            <h1 className="flex text-[20px] items-center mobile:text-[15px]">
              Email:{" "}
              <h1 className="ml-[8px] font-bold text-[30px] tablet:text-[20px] mobile:text-[17px] dark:text-bglight text-zinc-800">
                {user?.email}
              </h1>
            </h1>
            <div className="flex">
              <h1 className="pr-[2%] flex text-[20px] items-center mobile:text-[15px]">
                Posts:{" "}
                {posts ? (
                  <h1 className="ml-[8px] font-bold tablet:text-[20px] mobile:text-[17px] dark:text-bglight text-zinc-800">
                    {posts.length}
                  </h1>
                ) : (
                  <h1 className="ml-[8px] font-bold text-[30px] text-bglight">
                    0
                  </h1>
                )}
              </h1>
            </div>
            <div className="w-full flex justify-around items-center">
              <NavLink to={`/editProfile/${userdata.$id}`}>
                <Auth_btn text="Edit" className="bg-black h-[20px] w-[70px]" />
              </NavLink>
              {/* <div className="w-full  mt-[70px]"> */}
              <Logout className="" />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Profile;
