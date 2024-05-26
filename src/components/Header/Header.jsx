import React, { useEffect, useState } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTheme } from "../../store/themeSlice";
import { NavLink } from "react-router-dom";
import Container from "../Container";
import Logout from "../Logout";

function Header({ className }) {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.userData);
  const [themeMode, setdarkMode] = useState("light");
  const [isReady, setIsReady] = useState(false);

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const clickOnProfile = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const themecheck = localStorage.getItem("themeMode");
    if (themecheck) {
      document.querySelector("html").classList.remove("light", "dark");
      document.querySelector("html").classList.add(themecheck);
      setdarkMode(themecheck);
      dispatch(getCurrentTheme(themecheck));
    }
    setIsReady(true);
  }, [themeMode]);


  const themeSwitch = () => {
    const theme = themeMode === "dark" ? "light" : "dark";
    localStorage.setItem("themeMode", theme);
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(theme);
    setdarkMode(theme);
  };

  const navItmes = [
    { name: "Your Posts", path: "/yourPosts", active: authStatus },
    { name: "Create Posts", path: "/createPost", active: authStatus },
    { name: "Login", path: "/login", active: !authStatus },
    { name: "Sign Up", path: "/signup", active: !authStatus },
    { name: "Profile", path: "/profile", active: authStatus },
    { name: "All Posts", path: "/allPosts", active: authStatus },
    { name: "Home", path: "/", active: !authStatus || authStatus },
  ];

  const userdata = useSelector((state) => state.auth.userData);

  return (
    <div
      className={`flex items-center w-full py-1 px-6 justify-evenly  tablet: tablet:py-4 tablet:justify-between  ${className}  z-[20]  fixed top-0  max-w-[1400px] tablet:fixed backdrop-filter 
      backdrop-blur-lg`} onClick={() => setIsOpen(false)}
    >
      <div className="flex items-center justify-between">
        {/* <img
            src="flower.png"
            alt="no logo"
            className="w-[40px] tablet:hidden"
          /> */}
        <div className="flex translate-x-[-70px] tablet:translate-x-0">
          <h1
            className={`${
              themeMode === "light" ? "logo-dark" : "logo"
            } text-[50px] text-white  mobile:text-[30px]`}
          >
            B.
          </h1>
          <h1
            className={` text-[30px] mt-[20px] mobile:text-[20px] mobile:mt-[10px] dark:text-yellow-700 text-white ${
              themeMode === "light" ? "logo-dark-2" : "logo2"
            }`}
          >
            Log()
          </h1>
        </div>
        <div
          onClick={themeSwitch}
          className="cursor-pointer absolute right-[3%] tablet:right-[45%]"
        >
          {themeMode === "dark" ? (
            <MdOutlineLightMode size={30} color="#ffffff" />
          ) : (
            <MdOutlineDarkMode size={30} color="#030404" />
          )}
        </div>
      </div>
      <div
        className={`flex w-[60%]  top-[0px] justify-center gap-[3vw] mobile:gap-[7vw] p-3 tablet:flex-col 
          ${isOpen ? "tablet:right-[0px] " : "tablet:right-[-300px]"} 
          tablet:flex tablet:gap-[70px] bg-white dark:bg-zinc-800 tablet:w-[30%] tablet:h-[100vh] tablet:text-2xl transition-all duration-300  mobile:w-[40%] tablet:rounded-s-3xl tablet:rounded-none shadow-xl shadow-darkgreen rounded-3xl tablet:absolute `}
      >
        {navItmes.map((nav) =>
          nav.active ? (
            <NavLink
              onClick={toggleMenu}
              key={nav.name}
              to={nav.path}
              className={({ isActive }) =>
                `${
                  nav.name === "Profile" ? "hidden" : ""
                } tablet:block text-darkgreen py-1 px-5 rounded-lg text-center hover:scale-[1.1] transition-all duration-200 cursor-pointer tablet:text-zinc-900 tablet:hover:text-green-200 mobile:text-[14px] dark:text-zinc-200 dark:hover:text-green-300 tablet:text-[20px]   
                ${
                  isActive
                    ? " shadow-lg shadow-black text-red-700 dark:shadow-white dark:shadow-sm"
                    : ""
                }
                    dark:${isActive ? "bg-zinc-300" : ""} `
              }
            >
              {nav.name}
            </NavLink>
          ) : null
        )}
        <div
          className={` tablet:absolute tablet:bottom-[20vh] tablet:left-[12vw] mobile:bottom-[20vh] moblie:absolute mobile:left-[11vw] mobile:right-[60px] ${
            userdata ? "block" : "hidden"
          }`}
        >
          <Logout className=""  />
        </div>
      </div>
      {navItmes.map((item) =>
        item.name === "Profile" && item.active ? (
          <NavLink to="/profile" key={item.name} onClick={clickOnProfile}>
            <div className="hover:scale-110 transition-all duration-100 cursor-pointer  flex flex-col justify-center items-center">
              <div className=" w-full text-center text-zinc-800 dark:text-zinc-200 mobile:hidden flex underline tablet:hidden">
                {userData && <p className="font-bold">{userData.name} &gt;</p>}
              </div>
            </div>
          </NavLink>
        ) : null
      )}

      <div className=" right-4 z-50 hidden tablet:block mt-[10px]">
        <button onClick={toggleMenu} className="focus:outline-none">
          <span
            className={`block w-6 h-1 dark:bg-yellow-700 bg-light-mode dark:bg-light-mode  mb-1 transition-transform duration-300 transform origin-center `}
            style={{
              transform: isOpen
                ? "rotate(45deg) translate(3px, 6px) "
                : "rotate(0) translate(0, 0)",
            }}
          ></span>

          <span
            className={`block w-6 h-1 dark:bg-yellow-700 bg-light-mode dark:bg-light-mode mb-1 transition-opacity duration-300 opacity-0 `}
            style={{ opacity: isOpen ? "0" : "1" }}
          ></span>

          <span
            className={`block w-6 h-1 dark:bg-yellow-700 bg-light-mode dark:bg-light-mode  mb-1 transition-transform duration-300 transform origin-center `}
            style={{
              transform: isOpen
                ? "rotate(-45deg) translate(4px, -8px) "
                : "rotate(0) translate(0, 0)",
            }}
          ></span>
        </button>
      </div>
    </div>
  );
}

export default Header;
